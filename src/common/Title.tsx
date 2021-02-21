import React from 'react';
import CustomText from './CustomText';
import { StyleSheet, View } from 'react-native';
import { getPlatformDimension } from '../utils/device';

const Title = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <CustomText size="header" centered ellipsizeMode="tail" numberOfLines={1}>
      {title}
    </CustomText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: getPlatformDimension(25, 10, 15),
    paddingHorizontal: 70,
  },
});

export default Title;
