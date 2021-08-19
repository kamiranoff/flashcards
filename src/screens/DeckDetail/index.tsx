import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, StyleSheet, View } from 'react-native';
import { DeckDetailScreenRouteProp, Screens } from '../../navigation/types';
import { getStatusBarHeight, SPACING } from '../../utils/device';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AnimatedView, GeneralAlert } from '../../common';
import { selectBadAnswers, selectDeckItem, selectGoodAnswers } from '../../redux/seclectors';
import {
  clearDecksError,
  getDeckByShareId,
  saveDeckToDB,
  shuffleCards,
  sortByRankCards,
} from '../../redux/decks/actions';
import TopContent from './components/TopContent';
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
import AppText from '../../common/AppText';

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

  useEffect(() => {
    if (isLoading || isMount) {
      return;
    }

    if (error && !isLoading) {
      const message = isConnected ? NotificationMessages.ERROR : NotificationMessages.NETWORK_ERROR;
      alertRef.current?.startAnimation(message);
    }
  }, [isLoading, error, isMount, isConnected]);

  const handleGeneralAlertFinish = () => {
    dispatch(clearDecksError());
  };

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
    if (sub && !error) {
      refRBSheet.current?.open();
    }
    if (!sub || error) {
      setIsShareOpen(true);
      navigate(Screens.LOGIN_OR_SIGNUP);
      return;
    }
    if (sub && deckDetail.isOwner && !deckDetail.shareId) {
      dispatch(saveDeckToDB(id));
    }
  };

  useEffect(() => {
    if (isShareOpen && sub) {
      refRBSheet.current?.open();
      setIsShareOpen(false);
    }
  }, [isShareOpen, sub]);
  const handleCloseShare = () => refRBSheet.current?.close();

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar hidden />
      <GeneralAlert
        text={error ? NotificationMessages.ERROR : NotificationMessages.UPDATE}
        ref={alertRef}
        onAnimationFinish={handleGeneralAlertFinish}
      />
      <Header title={deckDetail.title} deckId={id} />
      <SharedElement id={`item.${id}`} style={styles.titleContainer}>
        <AppText size="header" centered ellipsizeMode="tail" numberOfLines={1}>
          {deckDetail.title}
        </AppText>
      </SharedElement>
      <View style={[styles.topView, { backgroundColor: color }]}>
        <TopContent
          total={deckDetail.cards.length}
          badAnswersTotal={badAnswers}
          goodAnswersTotal={goodAnswers}
        />
      </View>
      <AnimatedView top={500} scaleRatio={0.9} duration={500} styles={styles.listContainer}>
        <View style={styles.list}>
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
      </AnimatedView>
      {deckDetail.cards.length ? (
        <Menu
          onShufflePress={handleShuffleCards}
          onSortPress={handleSortCards}
          onSharePress={handleShareDeck}
        />
      ) : null}
      <BottomSheetModal ref={refRBSheet} height={320}>
        <ShareContentPopup
          error={error}
          deckId={id}
          handleGoBack={handleCloseShare}
          handleDismissBottomSheet={handleCloseShare}
        />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
  topView: {
    borderRadius: 0,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: SPACING,
    backgroundColor: 'white',
  },
  titleContainer: {
    paddingHorizontal: 70,
    paddingTop: 7,
  },
});

export default DeckDetail;
