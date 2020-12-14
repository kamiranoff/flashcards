import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { DecksList } from 'modules/DecksList';

const Home = () => (
  <SafeAreaView style={styles.container}>
    <DecksList />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
