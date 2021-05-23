import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../../common';

const Title: FC = () => (
  <View style={styles.container}>
    <AppText size="h2" centered>
      Sign Up or Log In
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export { Title };
