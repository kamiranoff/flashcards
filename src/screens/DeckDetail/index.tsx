import React, { FC, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, StyleSheet, View } from 'react-native';
import { DeckDetailScreenRouteProp, Screens } from '../../navigation/types';
import {
  getPlatformDimension,
  isIOS,
  isLargeDevice,
  isSmallDevice,
  SPACING,
  WINDOW_HEIGHT,
} from '../../utils/device';
import IconButton from '../../common/IconButton';
import { CloseButton, Container, GeneralAlert, Title } from '../../common';
import { selectBadAnswers, selectDeckItem, selectGoodAnswers } from '../../redux/seclectors';
import { getDeckByShareId, shuffleCards, sortByRankCards } from '../../redux/decks/actions';
import TopContent from './components/TopContent';
import { theme } from '../../utils';
import useOpacity from './useOpacity';
import { RootState } from '../../redux/store';
import { GeneralAlertRef, NotificationMessages } from '../../common/GeneralAlert';
import { useIsMount } from '../../utils/useIsMount';
import { Menu } from './components/Menu';
import Cards from './components/Cards';
import { NoContentOrPlay } from './components/NoContent';
import { TransitionedCards } from './components/TransitionedCards';

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;
const TOP_HEADER_HEIGHT_SPACING = TOP_HEADER_HEIGHT - (isSmallDevice() ? 0 : 30);

// Note: why there is a IOS and Android content? SharedElement wasn't working on Android, this is why it is handled differently - FIXME: upgrade react-navigation-shared-element
export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({
  route: {
    params: { id, color },
  },
}) => {
  const ref = useRef<any | null | undefined>(); // TODO: fix type
  const isMount = useIsMount();
  const { opacityVal } = useOpacity();
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const deckDetail = useSelector(selectDeckItem(id));
  const badAnswers = useSelector(selectBadAnswers(id));
  const goodAnswers = useSelector(selectGoodAnswers(id));
  const { isLoading, error } = useSelector((state: RootState) => state.decks);

  const alertRef = useRef<GeneralAlertRef>(null);

  useEffect(() => {
    if (isLoading || isMount) {
      return;
    }

    if (error || !isLoading) {
      alertRef.current?.startAnimation();
    }
  }, [isLoading, error]);

  const handleOnPlusPress = () => navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: id });

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
    return navigate(Screens.ALERT, { modalTemplate: 'shareModal', deckId: id });
  };

  const handlerRefreshSharedDeck = () => {
    if (deckDetail.shareId) {
      dispatch(getDeckByShareId(deckDetail.shareId, id));
    }
  };

  return (
    <Container>
      <GeneralAlert text={error ? NotificationMessages.ERROR : NotificationMessages.UPDATE} ref={alertRef} />
      <CloseButton onPress={goBack} />
      <View style={styles.addIcon}>
        <IconButton onPress={handleOnPlusPress} iconName="plusCurve" />
      </View>
      <SharedElement id={`item.${id}`} style={StyleSheet.absoluteFillObject}>
        <View style={[StyleSheet.absoluteFillObject, styles.topView, { backgroundColor: color }]} />
      </SharedElement>
      <Title title={deckDetail.title} />
      <TopContent
        total={deckDetail.cards.length}
        badAnswersTotal={badAnswers}
        goodAnswersTotal={goodAnswers}
      />
      {isIOS ? (
        <SharedElement
          id="general.bg"
          style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT + 30 }] }]}>
          <View style={[StyleSheet.absoluteFillObject, styles.dummy]}>
            <Animated.View style={{ opacity: opacityVal }}>
              <NoContentOrPlay hasCards={!!deckDetail.cards.length} onPress={navigateToPlayground} />
              <TransitionedCards
                ref={ref}
                items={deckDetail.cards}
                deckId={id}
                isLoading={isLoading}
                handlerRefresh={handlerRefreshSharedDeck}
              />
            </Animated.View>
          </View>
        </SharedElement>
      ) : (
        <View style={styles.androidList}>
          <NoContentOrPlay hasCards={!!deckDetail.cards.length} onPress={navigateToPlayground} />
          <Cards
            cards={deckDetail.cards}
            deckId={id}
            handlerRefreshSharedDeck={handlerRefreshSharedDeck}
            isLoading={isLoading}
          />
        </View>
      )}
      {deckDetail.cards.length && deckDetail.shareId && !isLoading ? (
        <View style={styles.refresh}>
          <IconButton onPress={handlerRefreshSharedDeck} iconName="refresh" />
        </View>
      ) : null}
      {deckDetail.cards.length ? (
        <View style={styles.menu}>
          <Menu
            onShufflePress={handleShuffleCards}
            onSortPress={handleSortCards}
            onSharePress={handleShareDeck}
          />
        </View>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50),
    zIndex: 9,
  },
  topView: {
    borderRadius: 0,
    height: TOP_HEADER_HEIGHT + 60,
  },
  dummy: {
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
  refresh: {
    position: 'absolute',
    bottom: isLargeDevice() ? 40 : 20,
    left: 16,
  },
});

export default DeckDetail;
