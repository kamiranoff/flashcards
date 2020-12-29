import React, { FC } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../navigation/interface';
import { Card } from '../../../redux/reducer';
import { WINDOW_HEIGHT } from '../../../styles/utils';
import { useDispatch } from 'react-redux';
import { HtmlParser, NativeAlert } from '../../../common';
import { deleteCard } from '../../../redux/actions';
import CustomText from '../../../common/CustomText';

export interface Props {
  cards: Card[];
  deckId: string;
}
const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;

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
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: Card }) => {
    const handleDeleteCard = () => {
      NativeAlert('Are you sure you want to delete this card?', () => dispatch(deleteCard(deckId, item.id)));
    };

    if (item.id === 'empty') {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
      <View style={styles.item}>
        <TouchableOpacity
          onLongPress={handleDeleteCard}
          onPress={() => navigate(Screens.PLAYGROUND, { deckId, cardId: item.id })}>
          <View style={styles.content}>
            <View style={styles.inner}>
              <CustomText size="h3" underlined>
                Question:
              </CustomText>
              <HtmlParser isSliced text={`${item.question}...`} />
            </View>
            <View style={styles.inner}>
              <CustomText size="h3" underlined>
                Answer:
              </CustomText>
              <HtmlParser isSliced text={item.answer} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={numberColumns}
      contentContainerStyle={{ paddingBottom: TOP_HEADER_HEIGHT }}
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
    padding: 10,
    margin: 5,
    height: 210,
    width: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
  },
  content: {
    flex: 1,
    width: 180,
    padding: 5,
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
});

export default Cards;
