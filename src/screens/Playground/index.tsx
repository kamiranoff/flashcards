import React, { FC, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import * as R from 'ramda';
import RBSheet from 'react-native-raw-bottom-sheet';
import { PlaygroundScreenNavigationProp, PlaygroundScreenRouteProp, Screens } from '../../navigation/types';
import { CloseButton, Container, GeneralAlert, Title } from '../../common';
import { selectDeckItem, selectError } from '../../redux/seclectors';
import CardItem from './CardItem';
import { Card } from '../../redux/decks/reducer';
import { getPlatformDimension, isIOS, isSmallDevice } from '../../utils/device';
import { saveDeckToDB, scoreCard } from '../../redux/decks/actions';
import { SCORES } from '../../redux/decks/interface';
import ActionButtons from './ActionButtons';
import NoMoreCards from './NoMoreCards/NoMoreCards';
import { theme } from '../../utils';
import PrimaryButton from '../../common/PrimaryButton';
import { RootState } from '../../redux/store';
import { triggerRateApp } from '../../redux/user/actions';
import rateApp from '../../modules/rateApp';
import { useInterstitialAd } from '../../service/useInterstitialAd';
import { AdUnitIds } from '../../service/config';
import { ShareContentPopup } from '../../components/Popups/ShareContentPopup';
import { BottomSheetModal } from '../../common/BottomSheetModal';
import useNetInfo from '../../hooks/useNetInfo';
import { GeneralAlertRef, NotificationMessages } from '../../common/GeneralAlert';
import { useShareDeck } from '../../hooks/useShareDeck';

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const STACK_SIZE = 3;

const AD_ID = isIOS ? AdUnitIds.IOS_PRE_PLAYGROUND_PROMO : AdUnitIds.ANDROID_PRE_PLAYGROUND_PROMO;

const Playground: FC<Props> = ({ route: { params }, navigation: { goBack, navigate } }) => {
  const swiperRef = useRef<Swiper<Card>>(null);
  const refRBSheet = useRef<RBSheet>(null);
  const alertRef = useRef<GeneralAlertRef>(null);
  const dispatch = useDispatch();
  const [noMoreCards, setNoMoreCards] = useState(false);
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const error = useSelector(selectError);
  const { ratedAppAt, sub } = useSelector((state: RootState) => state.user);
  const cardPressed = R.find(R.propEq('frontendId', params.cardId), deckDetail.cards);
  const restOfCards = R.reject(R.propEq('frontendId', params.cardId), deckDetail.cards);
  const reOrderedCards = cardPressed ? [cardPressed, ...restOfCards] : deckDetail.cards; // First card is the one which has been clicked from deck detail
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isConnected = useNetInfo();

  useInterstitialAd(AD_ID);

  useShareDeck(isShareOpen, deckDetail.shareId, params.deckId, () => {
    refRBSheet.current?.open();
    setIsShareOpen(false);
  });

  const handleShareDeck = async () => {
    if (!isConnected) {
      return alertRef.current?.startAnimation(NotificationMessages.NETWORK_ERROR);
    }

    if (!sub || error) {
      setIsShareOpen(true);
      navigate(Screens.LOGIN_OR_SIGNUP);
      return;
    }
    refRBSheet.current?.open();
    if (sub && deckDetail.isOwner && !deckDetail.shareId && !error) {
      dispatch(saveDeckToDB(params.deckId));
    }
  };

  const handleCloseShare = () => {
    refRBSheet.current?.close();
  };

  const renderCard = (item: Card) => (
    <CardItem card={item} title={deckDetail.title} deckId={params.deckId} isShared={!!deckDetail.shareId} />
  );

  const scoreGoodAnswer = (i: number) => {
    const cId = reOrderedCards[i].frontendId;
    if (cId) {
      dispatch(scoreCard(params.deckId, cId, SCORES.GOOD));
    }
  };

  const scoreBadAnswer = (i: number) => {
    const cId = reOrderedCards[i].frontendId;
    if (cId) {
      dispatch(scoreCard(params.deckId, cId, SCORES.BAD));
    }
  };

  const handlePressRight = () => {
    if (swiperRef) {
      swiperRef.current?.swipeRight();
    }
  };

  const handlePressLeft = () => {
    swiperRef.current?.swipeLeft();
  };

  const handleSwipeRight = (currentIndex: number) => scoreGoodAnswer(currentIndex);
  const handleSwipeLeft = (currentIndex: number) => scoreBadAnswer(currentIndex);

  const handleGoBack = () => {
    if (deckDetail.cards.length && !ratedAppAt) {
      dispatch(triggerRateApp());
      rateApp(true);
    }
    goBack();
  };

  const renderCards = () => {
    if (noMoreCards) {
      return <NoMoreCards deckId={params.deckId} />;
    }

    return (
      <Swiper
        ref={swiperRef}
        cards={reOrderedCards}
        renderCard={renderCard}
        backgroundColor={'transparent'}
        onTapCard={() => null}
        cardVerticalMargin={10}
        stackSize={STACK_SIZE}
        stackScale={10}
        verticalSwipe={false}
        stackSeparation={30}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        animateOverlayLabelsOpacity
        animateCardOpacity
        disableTopSwipe
        disableBottomSwipe
        overlayLabels={theme.playgroundOverlayButtons}
        onSwipedAll={() => setNoMoreCards(true)}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <GeneralAlert ref={alertRef} />
      <CloseButton onPress={handleGoBack} />
      <Title title={deckDetail.title} style={styles.title} />
      <View style={styles.shareButtonContainer}>
        <PrimaryButton buttonText="Share" onPress={handleShareDeck} />
      </View>
      <View style={styles.swiperContainer}>
        {renderCards()}
        {!noMoreCards ? (
          <ActionButtons onPressLeft={handlePressLeft} onPressRight={handlePressRight} />
        ) : null}
      </View>
      <BottomSheetModal ref={refRBSheet} height={310}>
        <ShareContentPopup
          error={error}
          deckId={params.deckId}
          handleGoBack={handleCloseShare}
          handleDismissBottomSheet={handleCloseShare}
        />
      </BottomSheetModal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background2,
  },
  title: {
    paddingTop: getPlatformDimension(25, 10, 15),
  },
  swiperContainer: {
    flex: 1,
    marginTop: isSmallDevice() ? 15 : getPlatformDimension(30, 20, 40),
  },
  shareButtonContainer: {
    width: 60,
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 15, 45, 20),
    zIndex: 999,
  },
});

export default Playground;
