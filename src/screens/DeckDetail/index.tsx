import React, { FC } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, StyleSheet, View } from 'react-native';
import { RootStackParamList, Screens } from '../../navigation/interface';
import Cards from './components/Cards';
import { getPlatformDimension, isIOS, isSmallDevice, SPACING, WINDOW_HEIGHT } from '../../utils/device';
import IconButton from '../../common/IconButton';
import { CloseButton, Container, NoContentInfo, Title } from '../../common';
import { selectBadAnswers, selectDeckItem, selectGoodAnswers } from '../../redux/seclectors';
import { sortByRankCards, shuffleCards, getDeckByShareId } from '../../redux/decks/actions';
import TopContent from './components/TopContent';
import { theme } from '../../utils';
import ActionButtons from './components/ActionButtons';
import useOpacity from './useOpacity';

type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;

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
  const { opacityVal } = useOpacity();
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const deckDetail = useSelector(selectDeckItem(id));
  const badAnswers = useSelector(selectBadAnswers(id));
  const goodAnswers = useSelector(selectGoodAnswers(id));

  const handleOnPress = () => navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: id });

  const navigateToPlayground = () =>
    navigate(Screens.PLAYGROUND, { deckId: id, cardId: deckDetail.cards[0].id });

  const handleSortCards = () => dispatch(sortByRankCards(id));
  const handleShuffleCards = () => dispatch(shuffleCards(id));
  const handlerRefreshSharedDeck = async () => {
    if (deckDetail.sharedWithYou || deckDetail.sharedByYou) {
      dispatch(getDeckByShareId(deckDetail.shareId, id));
    }
  };

  return (
    <Container>
      <CloseButton onPress={goBack} />
      <View style={styles.addIcon}>
        <IconButton onPress={handleOnPress} iconName="plusCurve" />
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
              {deckDetail.cards.length ? (
                <ActionButtons
                  navigate={navigateToPlayground}
                  shuffle={handleShuffleCards}
                  sort={handleSortCards}
                />
              ) : (
                <NoContentInfo text="card" style={styles.noContentInfo} iconName="prettyLady" />
              )}
              <Cards cards={deckDetail.cards} deckId={id} isOwner={deckDetail.isOwner} />
            </Animated.View>
          </View>
        </SharedElement>
      ) : (
        <View style={styles.androidList}>
          {deckDetail.cards.length ? (
            <ActionButtons
              navigate={navigateToPlayground}
              shuffle={handleShuffleCards}
              sort={handleSortCards}
            />
          ) : (
            <NoContentInfo text="card" style={styles.noContentInfo} iconName="prettyLady" />
          )}
          <Cards cards={deckDetail.cards} deckId={id} isOwner={deckDetail.sharedByYou} />
        </View>
      )}
      {deckDetail.sharedWithYou || deckDetail.sharedByYou ? (
        <View style={styles.refresh}>
          <IconButton onPress={handlerRefreshSharedDeck} iconName="refresh" />
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
  },
  androidList: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: SPACING,
    backgroundColor: 'white',
  },
  refresh: {
    position: 'absolute',
    bottom: getPlatformDimension(10, 10, 20),
    left: 10,
  },
  noContentInfo: {
    marginTop: WINDOW_HEIGHT / 6,
  },
});

export default DeckDetail;
