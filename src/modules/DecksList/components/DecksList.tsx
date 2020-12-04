import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import * as R from 'ramda';
import DeckItem from './DeckItem';
import { useDecks } from '../index';
import Button from '../../../common/Button';

const DecksList: FC = () => {
  const { decks, decksIds, handleAddDeck, handleRemoveDeck } = useDecks();

  const renderItem = ({ item }: { item: string }) => (
    <DeckItem
      item={item}
      title={R.prop('title', decks[item])}
      onPress={handleRemoveDeck(item)}
    />
  );

  return (
    <>
      <FlatList
        data={decksIds}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <View style={styles.buttonContainer}>
        <Button text="Plus" onPress={handleAddDeck} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default DecksList;
