import React, { FC } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export interface Props {
  children: React.ReactNode | React.ReactNode[];
  style: ViewStyle;
}

const Container: FC<Props> = ({ children, style }) => (
  <SafeAreaView style={[styles.container, style]}>
    <StatusBar hidden />
    {children}
  </SafeAreaView>
);

export default Container;
