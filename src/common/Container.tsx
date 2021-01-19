import React, { FC } from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
