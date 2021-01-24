import React, { FC } from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export interface Props {
  children: React.ReactNode | React.ReactNode[];
  style?: ViewStyle;
}

const Container: FC<Props> = ({ children, style }) => (
  <SafeAreaView style={[styles.container, style]}>
    <StatusBar hidden />
    {children}
  </SafeAreaView>
);

export default Container;
