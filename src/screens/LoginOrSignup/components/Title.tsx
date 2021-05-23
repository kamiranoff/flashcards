import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../../common';

const Title: FC = () => (
  <View style={styles.container}>
    <AppText size="header" centered>
      Login to save your flashcards.
    </AppText>
    <AppText size="header" centered>
      Share freely.
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export { Title };
