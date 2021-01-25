import { StyleSheet, View } from 'react-native';
import CustomText from '../../../common/CustomText';
import React from 'react';

const NoCardsText = () => (
  <View style={styles.container}>
    <CustomText size="h2" centered>
      Create your first card
    </CustomText>
    <CustomText size="h2" centered>
      by clicking plus button at the top.
    </CustomText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default NoCardsText;
