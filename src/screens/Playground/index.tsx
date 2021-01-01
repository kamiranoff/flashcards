import React, { FC } from 'react';
import { Button, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import * as R from 'ramda';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { CloseButton, Container } from '../../common';
import CustomText from '../../common/CustomText';
import { selectDeckItem } from '../../redux/seclectors';
import CardItem from './Card';
import Swiper from './Swiper';
import { Card } from '../../redux/reducer';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const Playground: FC<Props> = ({ route: { params }, navigation: { goBack } }) => {
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const card = R.find(R.propEq('id', params.cardId), deckDetail.cards);
  const restOfCards = R.reject(R.propEq('id', params.cardId), deckDetail.cards);
  const reOrderedCards = card ? [card, ...restOfCards] : deckDetail.cards; // First card is the one is clicked from prev screen

  const renderCard = (item: Card) => <CardItem card={item} title={deckDetail.title} deckId={params.deckId} />;

  const onSwipeRight = (item: Card) => {
    console.log('onSWipe Right', item);
  };

  const onSwipeLeft = (item: Card) => {
    console.log('onSWipe Left', item);
  };

  const renderNoMoreCards = () => {
    return (
      <View>
        <CustomText size="h1" centered>
          There's no more content here!
        </CustomText>
        <Button onPress={() => console.log('Get more')} title="Get more!" />
      </View>
    );
  };

  return (
    <Container>
      <CloseButton onPress={goBack} />
      <CustomText size="h1" centered>
        {deckDetail.title}
      </CustomText>
      <Swiper
        deckId={params.deckId}
        cards={reOrderedCards}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        renderNoMoreCards={renderNoMoreCards}
        renderCard={renderCard}
      />
    </Container>
  );
};

export default Playground;
