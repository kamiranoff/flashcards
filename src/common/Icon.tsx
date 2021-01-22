import React, { FC, memo } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import assets from '../assets';
import { theme } from '../utils';

export interface IconButtonProps {
  name:
    | 'goBack'
    | 'add'
    | 'trash'
    | 'play'
    | 'edit'
    | 'plus'
    | 'close'
    | 'wrong'
    | 'good'
    | 'menu'
    | 'menuCurve'
    | 'plusCurve'
    | 'x'
    | 'magicWanda'
    | 'chat'
    | 'heartCupid'
    | 'sale'
    | 'gift'
    | 'free'
    | 'student'
    | 'star';
  style?: ViewStyle;
  bgColor?: string;
}

const Icon: FC<IconButtonProps> = memo(({ name, style, bgColor }) => (
  <View style={[styles.container, style, { backgroundColor: bgColor }]}>
    <Image source={assets.icons[name]} resizeMode="contain" style={styles.img} />
  </View>
));

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    zIndex: 9,
  },
  container: {
    backgroundColor: theme.colors.icon,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default Icon;
