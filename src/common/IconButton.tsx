import React, { FC } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';
import assets from '../assets';
import { HIT_SLOP } from '../styles/utils';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  iconName: 'goBack' | 'add' | 'remove' | 'play' | 'edit' | 'plus';
}

const IconButton: FC<Props> = ({ onPress, iconName }) => (
  <TouchableWithoutFeedback onPress={onPress} hitSlop={HIT_SLOP}>
    <Image source={assets.icons[iconName]} resizeMode="contain" style={styles.img} />
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  img: {
    width: 32,
    height: 32,
  },
});

export default IconButton;
