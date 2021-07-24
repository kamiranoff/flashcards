import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { DeckDetailScreenRouteProp, Screens } from '../../navigation/types';
import { isIOS, isLargeDevice, isSmallDevice, SPACING, WINDOW_HEIGHT } from '../../utils/device';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Container, GeneralAlert, Title } from '../../common';
import { selectBadAnswers, selectDeckItem, selectGoodAnswers } from '../../redux/seclectors';
import { getDeckByShareId, saveDeckToDB, shuffleCards, sortByRankCards } from '../../redux/decks/actions';
import TopContent from './components/TopContent';
import { theme } from '../../utils';
// import useOpacity from './useOpacity';
import { RootState } from '../../redux/store';
import { GeneralAlertRef, NotificationMessages } from '../../common/GeneralAlert';
import { useIsMount } from '../../utils/useIsMount';
import { Menu } from './components/Menu';
import { NoContentOrPlay } from './components/NoContent';
import { TransitionedCards } from './components/TransitionedCards';
import useNetInfo from '../../hooks/useNetInfo';
import { BottomSheetModal } from '../../common/BottomSheetModal';
import { ShareContentPopup } from '../../components/Popups/ShareContentPopup';
import { useShareDeck } from '../../hooks/useShareDeck';
import { useDeckPusher } from './useDeckPusher';
import { Header } from './components/Header';
import { RefreshIcon } from './components/RefreshIcon';

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;
const TOP_HEADER_HEIGHT_SPACING = TOP_HEADER_HEIGHT - (isSmallDevice() ? 0 : 30);

export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({
  route: {
    params: { id, color },
  },
}) => {
  const ref = useRef<any | null | undefined>(); // TODO: fix type
  const refRBSheet = useRef<RBSheet>(null);
  const isMount = useIsMount();
  // const { opacityVal } = useOpacity();
  const dispatch = useDispatch();
  const { sub } = useSelector((state: RootState) => state.user);
  const { navigate } = useNavigation();
  const deckDetail = useSelector(selectDeckItem(id));
  const badAnswers = useSelector(selectBadAnswers(id));
  const goodAnswers = useSelector(selectGoodAnswers(id));
  const { isLoading, error } = useSelector((state: RootState) => state.decks);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isConnected = useNetInfo();
  const alertRef = useRef<GeneralAlertRef>(null);
  const showRefresh = Boolean(deckDetail.cards.length && deckDetail.shareId && !isLoading);

  useEffect(() => {
    if (isLoading || isMount) {
      return;
    }

    if (error && !isLoading) {
      const message = isConnected ? NotificationMessages.ERROR : NotificationMessages.NETWORK_ERROR;
      alertRef.current?.startAnimation(message);
    }
  }, [isLoading, error, isMount, isConnected]);

  const handlerRefreshSharedDeck = () => {
    if (deckDetail.shareId) {
      dispatch(getDeckByShareId(deckDetail.shareId, id));
    }
  };

  useDeckPusher(deckDetail.deckId, deckDetail.shareId, handlerRefreshSharedDeck);

  useShareDeck(isShareOpen, deckDetail.shareId, id, () => {
    refRBSheet.current?.open();
    setIsShareOpen(false);
  });

  const navigateToPlayground = () =>
    navigate(Screens.PLAYGROUND, { deckId: id, cardId: deckDetail.cards[0].frontendId });

  const handleSortCards = () => {
    ref.current?.animateNextTransition();
    dispatch(sortByRankCards(id));
  };

  const handleShuffleCards = () => {
    ref.current?.animateNextTransition();
    dispatch(shuffleCards(id));
  };

  const handleShareDeck = async () => {
    refRBSheet.current?.open();
    if (!sub) {
      setIsShareOpen(true);
      navigate(Screens.LOGIN_OR_SIGNUP);
      return;
    }
    if (sub && deckDetail.isOwner && !deckDetail.shareId) {
      dispatch(saveDeckToDB(id));
    }
  };

  const handleCloseShare = () => refRBSheet.current?.close();

  return (
    <Container>
      <GeneralAlert text={error ? NotificationMessages.ERROR : NotificationMessages.UPDATE} ref={alertRef} />
      <Header title={deckDetail.title} deckId={id} />
      <SharedElement id={`item.${id}`} style={StyleSheet.absoluteFillObject}>
        <View style={[StyleSheet.absoluteFillObject, styles.topView, { backgroundColor: color }]} />
      </SharedElement>
      <Title title={deckDetail.title} />
      <TopContent
        total={deckDetail.cards.length}
        badAnswersTotal={badAnswers}
        goodAnswersTotal={goodAnswers}
      />
      <SharedElement id="general.bg" style={[isIOS ? styles.sharedStyle : styles.androidList]}>
        <View style={[isIOS ? styles.dummy : styles.androidList]}>
          <NoContentOrPlay hasCards={!!deckDetail.cards.length} onPress={navigateToPlayground} />
          <TransitionedCards
            ref={ref}
            items={deckDetail.cards}
            deckId={id}
            isOwner={deckDetail.owner === sub || deckDetail.isOwner}
            isLoading={isLoading}
            handlerRefresh={handlerRefreshSharedDeck}
          />
        </View>
      </SharedElement>
      <RefreshIcon isVisible={showRefresh} onPress={handlerRefreshSharedDeck} />
      {deckDetail.cards.length ? (
        <View style={styles.menu}>
          <Menu
            onShufflePress={handleShuffleCards}
            onSortPress={handleSortCards}
            onSharePress={handleShareDeck}
          />
        </View>
      ) : null}
      <BottomSheetModal ref={refRBSheet} height={320}>
        <ShareContentPopup
          error={error}
          deckId={id}
          handleGoBack={handleCloseShare}
          sub={sub}
          handleDismissBottomSheet={handleCloseShare}
        />
      </BottomSheetModal>
    </Container>
  );
};

const styles = StyleSheet.create({
  topView: {
    borderRadius: 0,
    height: TOP_HEADER_HEIGHT + 60,
  },
  sharedStyle: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: WINDOW_HEIGHT + 30 }],
  },
  dummy: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    transform: [{ translateY: -WINDOW_HEIGHT + TOP_HEADER_HEIGHT_SPACING }],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderColor: theme.colors.lightBorder,
    borderWidth: 0.5,
    paddingTop: SPACING,
    paddingHorizontal: 5,
    paddingBottom: SPACING + 10,
    zIndex: 9,
  },
  androidList: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: SPACING,
    backgroundColor: 'white',
  },
  menu: {
    position: 'absolute',
    bottom: isLargeDevice() ? 40 : 20,
    right: 16,
    zIndex: 99,
  },
});

export default DeckDetail;
