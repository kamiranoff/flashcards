import React, { FC } from 'react';
import { Text, FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'modules/DecksList/redux/reducer';
import { Screens } from '../../../navigation/interface';

export interface Props {
  cards: Card[];
  deckId: string;
}

const numberColumns = 2;
const formatData = (cards: Card[], numColumns: number) => {
  const data: any = [...cards];
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, id: 'empty' });
    numberOfElementsLastRow += 1;
  }

  return data;
};

const Cards: FC<Props> = ({ cards, deckId }) => {
  const { navigate } = useNavigation();
  const renderItem = ({ item }: { item: Card }) => {
    if (item.id === 'empty') {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => navigate(Screens.PLAYGROUND, { deckId, cardId: item.id })}>
          <View style={styles.content}>
            <View style={styles.inner}>
              <Text style={styles.h3}>Question:</Text>
              <Text style={styles.h1}>{item.question}</Text>
            </View>
            <View style={styles.inner}>
              <Text style={styles.h3}>Answer:</Text>
              <Text style={styles.h1}>{item.answer}</Text>
            </View>
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
    flex: 1,
    padding: 5,
    margin: 5,
    height: 160,
    width: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  inner: {
    justifyContent: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    height: 160,
    width: 200,
    borderWidth: 0,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 14,
    fontWeight: 'normal',
    textDecorationLine: 'underline',
  },
});

export default Cards;
