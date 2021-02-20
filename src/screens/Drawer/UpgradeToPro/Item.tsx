import { Icon } from '../../../common';
import { StyleSheet, View } from 'react-native';
import CustomText from '../../../common/CustomText';
import React, { FC } from 'react';

interface Props {
  label: string;
  text: string;
  icon: 'cardsWithPen' | 'decks' | 'noAds' | 'toolbar';
}

const Item: FC<Props> = ({ icon, label, text }) => (
  <View style={styles.container}>
    <Icon name={icon} />
    <View style={styles.inner}>
      <CustomText size="h2" textStyle={styles.text}>
        {label}
      </CustomText>
      <CustomText size="p">{text}</CustomText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  inner: {
    marginLeft: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Item;
