import React, { FC } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { CloseButton, Container, Title } from '../../common';
import CustomText from '../../common/CustomText';
import { selectDeckItem } from '../../redux/seclectors';
import CardItem from './Card';
import Swiper from './Swiper';
import { Card } from '../../redux/reducer';
import { getPlatformDimension, isIOS, isSmallDevice, WINDOW_WIDTH } from '../../styles/utils';
import { scoreCard, reorderCards } from '../../redux/actions';
import { SCORES } from '../../redux/interface';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.9 : WINDOW_WIDTH * 0.8;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const Playground: FC<Props> = ({ route: { params }, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const card = R.find(R.propEq('id', params.cardId), deckDetail.cards);
  const restOfCards = R.reject(R.propEq('id', params.cardId), deckDetail.cards);
  const reOrderedCards = card ? [card, ...restOfCards] : deckDetail.cards; // First card is the one is clicked from prev screen

  const renderCard = (item: Card) => <CardItem card={item} title={deckDetail.title} deckId={params.deckId} />;

  const onSwipeRight = (item: Card) => {
    dispatch(scoreCard(params.deckId, item.id, SCORES.GOOD));
  };

  const onSwipeLeft = (item: Card) => {
    dispatch(scoreCard(params.deckId, item.id, SCORES.BAD));
  };

  const reShuffleCards = () => dispatch(reorderCards(params.deckId));

  const renderNoMoreCards = () => {
    const badAnswers = deckDetail.cards.filter((c) => c.rank === 0).length;

    return (
      <View>
        <CustomText size="h1" centered>
          There are no more cards
        </CustomText>
        <CustomText size="h2" centered>
          Today you answered badly: {badAnswers};
        </CustomText>
        <Button onPress={reShuffleCards} title="Re-shuffle your cards" />
      </View>
    );
  };

  return (
    <Container>
      <CloseButton onPress={goBack} />
      <Title title={deckDetail.title} />
      <View style={styles.swiperContainer}>
        <Swiper
          deckId={params.deckId}
          cards={reOrderedCards}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          renderNoMoreCards={renderNoMoreCards}
          renderCard={renderCard}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
    marginTop: isSmallDevice() ? 15 : getPlatformDimension(30, 20, 40),
    marginLeft: WINDOW_WIDTH / 2 - ITEM_SIZE / 2,
  },
});

export default Playground;
