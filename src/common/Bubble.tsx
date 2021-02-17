import React from 'react';
import CustomText from './CustomText';
import { StyleSheet, View } from 'react-native';
import { theme } from '../utils';

const Bubble = ({ text = 'shared' }) => (
  <View style={styles.container}>
    <CustomText size="p">{text}</CustomText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 60,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.good,
  },
});

export default Bubble;
