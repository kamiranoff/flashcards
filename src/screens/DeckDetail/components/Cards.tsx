import React, { FC, useEffect, useRef } from 'react';
import { Animated, StyleSheet, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../navigation/interface';
import { Card } from '../../../redux/reducer';
import { getPlatformDimension, isIOS, isSmallDevice, WINDOW_HEIGHT } from '../../../utils/device';
import { useDispatch } from 'react-redux';
import { NativeAlert } from '../../../common';
import { deleteCard } from '../../../redux/actions';
import CardItem from './CardItem';
import { theme } from '../../../utils';

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
  const opacityVal = useRef(new Animated.Value(0)).current;
  const yValue = useRef(new Animated.Value(WINDOW_HEIGHT)).current;
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(opacityVal, {
      useNativeDriver: true,
      toValue: 1,
      duration: isIOS ? 100 : 50,
      delay: 0,
    }).start();
  }, [opacityVal]);

  useEffect(() => {
    Animated.timing(yValue, {
      useNativeDriver: true,
      toValue: 10,
      duration: 200,
      delay: 0,
    }).start();
  }, [yValue]);

  const renderItem = ({ item }: { item: Card }) => {
    const handleDeleteCard = () => {
      NativeAlert('Are you sure you want to delete this card?', () => dispatch(deleteCard(deckId, item.id)));
    };
    const handleNavigate = () => navigate(Screens.PLAYGROUND, { deckId, cardId: item.id });

    if (item.id === 'empty') {
      return <View style={styles.itemInvisible} />;
    }

    return (
      <Animated.View
        style={[
          styles.item,
          { backgroundColor: item.rank === 0 ? theme.colors.bad : theme.colors.icon },
          { opacity: opacityVal },
        ]}>
        <CardItem onPress={handleNavigate} onLongPress={handleDeleteCard} card={item} />
      </Animated.View>
    );
  };

  return isIOS ? (
    <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={numberColumns}
      contentContainerStyle={styles.contentContainerStyle}
      data={formatData(cards, numberColumns)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  ) : (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      numColumns={numberColumns}
      contentContainerStyle={styles.contentContainerStyle}
      data={formatData(cards, numberColumns)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={{ ...styles.flatListStyle, transform: [{ translateY: yValue }] }}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: TOP_HEADER_HEIGHT + 60,
    alignItems: 'center',
    marginTop: 10,
  },
  flatListStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    margin: 5,
    borderRadius: 8,
    ...theme.iconButtonShadow,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    width: isSmallDevice() ? 150 : getPlatformDimension(170, 170, 190),
    borderWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default Cards;
