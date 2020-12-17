import React, { FC } from 'react';
import { Text, FlatList, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'modules/DecksList/redux/reducer';
import { Screens } from '../../../navigation/interface';

export interface Props {
  cards: Card[];
  deckId: string;
}

const numberColumns = 2;
const formatData = (cards: Card[], numColumns: number) => {
  console.log('cards', cards);
  const data: any = [...cards];
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, id: 'empty' });
    numberOfElementsLastRow += 1;
  }

  console.log('data', data);
  return data;
};

const Cards: FC<Props> = ({ cards, deckId }) => {
  const { navigate } = useNavigation();
  const renderItem = ({ item }: { item: Card }) => {
    if (item.id === 'empty') {
      return (
        <View
          style={[
            styles.item,
            {
              height: Dimensions.get('window').width / numberColumns,
            },
            styles.itemInvisible,
          ]}
        />
      );
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => navigate(Screens.PLAYGROUND, { deckId, cardId: item.id })}>
          <View>
            <Text>Question: {item.question}</Text>
            <Text>Answer: {item.answer}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      numColumns={numberColumns}
      data={formatData(cards, numberColumns)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    flex: 1,
    margin: 10,
    height: 100,
    width: 200,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

export default Cards;
