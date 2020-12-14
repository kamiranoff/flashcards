import React, { FC } from 'react';
import { Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'modules/DecksList/redux/reducer';
import { Screens } from '../../../navigation/interface';

export interface Props {
  cards: Card[];
  deckId: string;
}

const Cards: FC<Props> = ({ cards, deckId }) => {
  const { navigate } = useNavigation();
  const renderItem = ({ item }: { item: Card }) => (
    <TouchableOpacity onPress={() => navigate(Screens.PLAYGROUND, { deckId, cardId: item.id })}>
      <Animated.View
      >
        <Text>Question: {item.question}</Text>
        <Text>Answer: {item.answer}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return <FlatList data={cards} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />;
};

export default Cards;
