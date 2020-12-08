import React, { FC } from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
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
      <Text>Question: {item.question}</Text>
      <Text>Answer: {item.answer}</Text>
    </TouchableOpacity>
  );

  return <FlatList data={cards} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />;
};

export default Cards;
