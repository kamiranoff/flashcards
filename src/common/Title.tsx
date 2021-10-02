import React from 'react';
import AppText from './AppText';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { getPlatformDimension, getStatusBarHeight } from '../utils/device';

const Title = ({ title, style }: { title: string; style?: StyleProp<ViewStyle> }) => (
  <View style={[styles.container, style]}>
    <AppText size="header" centered ellipsizeMode="tail" numberOfLines={1}>
      {title}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: getPlatformDimension(25, 10, getStatusBarHeight() + 20),
    paddingHorizontal: 70,
  },
});

export default Title;
