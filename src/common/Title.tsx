import React from 'react';
import CustomText from './CustomText';
import { StyleSheet, View } from 'react-native';
import { getPlatformDimension } from '../styles/utils';

const Title = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <CustomText size="h1" centered>
      {title}
    </CustomText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: getPlatformDimension(10, 20, 5),
    paddingHorizontal: 20,
  },
});

export default Title;
