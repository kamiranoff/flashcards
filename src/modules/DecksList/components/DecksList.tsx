import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import * as R from 'ramda';
import DeckItem from './DeckItem';
import { useDecks } from '../index';
import Button from '../../../common/Button';
import { Screens } from '../../../navigation';
import { useNavigation } from '@react-navigation/native';

const DecksList: FC = () => {
  const { decks, decksIds, handleAddDeck, handleRemoveDeck } = useDecks();
  const { navigate } = useNavigation();

  const renderItem = ({ item }: { item: string }) => {
    const title = R.prop('title', decks[item]);

    const handleNavigate = () =>
      title ? navigate(Screens.DECK_DETAIL, { item: decks[item] }) : null;

    return (
      <DeckItem
        item={item}
        title={title}
        onPress={handleRemoveDeck(item)}
        onNavigate={handleNavigate}
      />
    );
  };

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
