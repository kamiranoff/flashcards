import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DecksList, useDecks } from 'modules/DecksList';
import Button from 'common/Button';

const Home = () => {
  const { decks, decksIds, handleAddDeck, handleRemoveDeck } = useDecks();

  return (
    <View style={styles.container}>
      <DecksList decks={decks} decksIds={decksIds} onPress={handleRemoveDeck} />
      <View style={styles.buttonContainer}>
        <Button text="Plus" onPress={handleAddDeck} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Home;
