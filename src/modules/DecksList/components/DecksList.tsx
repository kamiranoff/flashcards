import React, { FC } from 'react';
import { FlatList } from 'react-native';
import * as R from 'ramda';
import { DecksState } from '../redux/reducer';
import DeckItem from './DeckItem';

interface Props {
  decks: DecksState;
  decksIds: string[];
  onPress: (item: string) => () => void;
}

const DecksList: FC<Props> = ({ decks, decksIds, onPress }) => {
  const renderItem = ({ item }: { item: string }) => (
    <DeckItem
      item={item}
      title={R.prop('title', decks[item])}
      onPress={onPress(item)}
    />
  );

  return (
    <FlatList
      data={decksIds}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  );
};

export default DecksList;
