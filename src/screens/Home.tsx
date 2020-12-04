import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DecksList } from 'modules/DecksList';

const Home = () => (
  <View style={styles.container}>
    <DecksList />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
