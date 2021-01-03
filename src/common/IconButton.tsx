import React, { FC, memo } from 'react';
import { Image, StyleSheet, GestureResponderEvent, TouchableOpacity, ImageStyle } from 'react-native';
import assets from '../assets';
import { HIT_SLOP } from '../styles/utils';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  iconName: 'goBack' | 'add' | 'remove' | 'play' | 'edit' | 'plus' | 'close' | 'wrong' | 'good';
  style?: ImageStyle;
}

const IconButton: FC<Props> = memo(({ onPress, iconName, style }) => (
  <TouchableOpacity onPress={onPress} hitSlop={HIT_SLOP}>
    <Image source={assets.icons[iconName]} resizeMode="contain" style={[styles.img, style]} />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    zIndex: 99999,
  },
});

export default IconButton;
