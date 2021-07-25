import React, { FC, useEffect, useRef } from 'react';
import { Animated, RefreshControl, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../navigation/types';
import { Card } from '../../../redux/decks/reducer';
import { WINDOW_HEIGHT } from '../../../utils/device';
import { useDispatch } from 'react-redux';
import { NativeAlert } from '../../../common';
import { deleteCard } from '../../../redux/decks/actions';
import CardItem from './CardItem';
import { theme } from '../../../utils';

export interface Props {
  cards: Card[];
  deckId: string;
  handlerRefreshSharedDeck: () => void;
  isLoading: boolean;
  isOwner: boolean;
}

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;
const numberColumns = 2;

const formatData = (cards: Card[], numColumns: number) => {
  const data: any = [...cards];
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, frontendId: 'empty' });
    numberOfElementsLastRow += 1;
  }
  return data;
};

const Cards: FC<Props> = ({ cards, deckId, handlerRefreshSharedDeck, isLoading, isOwner }) => {
  const yValue = useRef(new Animated.Value(WINDOW_HEIGHT)).current;
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(yValue, {
      useNativeDriver: true,
      toValue: 10,
      duration: 200,
      delay: 0,
    }).start();
  }, [yValue]);

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        title="Refreshing"
        titleColor={theme.colors.border}
        refreshing={isLoading}
        onRefresh={handlerRefreshSharedDeck}
        // tintColor={theme.colors.border}
      />
    );
  };

  const renderItem = ({ item }: { item: Card }) => {
    const handleDeleteCard = () => {
      NativeAlert('Are you sure you want to delete this card?', () =>
        dispatch(deleteCard(deckId, item.frontendId)),
      );
    };
    const handleNavigate = () => navigate(Screens.PLAYGROUND, { deckId, cardId: item.frontendId });

    if (item.frontendId && item.frontendId.toString() === 'empty') {
      return <View style={styles.itemInvisible} />;
    }
    return (
      <View
        style={[styles.item, { backgroundColor: item.rank === 0 ? theme.colors.bad : theme.colors.icon }]}>
        <CardItem onPress={handleNavigate} onTrashPress={handleDeleteCard} card={item} isOwner={isOwner} />
      </View>
    );
  };

  const getItemKey = (item: Card) => {
    if (item.frontendId) {
      return item.frontendId.toString();
    }
    return Math.random().toString();
  };

  return (
    <Animated.FlatList
      refreshControl={renderRefreshControl()}
      showsVerticalScrollIndicator={false}
      numColumns={numberColumns}
      contentContainerStyle={styles.contentContainerStyle}
      data={formatData(cards, numberColumns)}
      renderItem={renderItem}
      keyExtractor={getItemKey}
      style={{ ...styles.flatListStyle, transform: [{ translateY: yValue }] }}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: TOP_HEADER_HEIGHT + 60,
    marginTop: 10,
  },
  flatListStyle: {
    zIndex: 9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  item: {
    paddingHorizontal: 5,
    margin: 6,
    borderRadius: 8,
    ...theme.iconButtonShadow,
    flex: 1,
    flexDirection: 'row',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 5,
    margin: 6,
    flex: 1,
  },
});

export default Cards;
