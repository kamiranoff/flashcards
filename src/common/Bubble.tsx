import React from 'react';
import AppText from './AppText';
import { StyleSheet, View } from 'react-native';
import { theme } from '../utils';

const Bubble = ({ isShared }: { isShared: boolean }) => {
  if (!isShared) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <AppText size="p">Shared</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: -5,
    left: -5,
  },
  container: {
    width: 60,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.good,
  },
});

export default Bubble;
