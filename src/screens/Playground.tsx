import React, { FC } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { selectDeckItem } from '../modules/DecksList/redux/seclectors';
import { Card } from '../modules/DecksList/redux/reducer';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const Playground: FC<Props> = ({ route: { params }, navigation }) => {
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const renderItem = ({ item }: { item: Card }) => (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: params.deckId, cardId: item.id })
      }>
      <View style={{ height: 80 }}>
        <Text>Question: {item.question}</Text>
        <Text>Answer: {item.answer}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <Text>Playground</Text>
      <FlatList data={deckDetail.cards} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

export default Playground;
