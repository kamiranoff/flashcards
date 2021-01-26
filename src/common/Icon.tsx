import React, { FC, memo } from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';
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
    | 'star'
    | 'speedometer'
    | 'home'
    | 'notSureFace'
    | 'happyFace'
    | 'question'
    | 'cards'
    | 'cardsWithPen'
    | 'decks'
    | 'noAds'
    | 'toolbar';
  style?: ViewStyle;
  bgColor?: string;
  imgStyle?: ImageStyle;
}

const Icon: FC<IconButtonProps> = memo(({ name, style, bgColor, imgStyle }) => (
  <View style={[styles.container, style, { backgroundColor: bgColor }]}>
    <Image source={assets.icons[name]} resizeMode="contain" style={[styles.img, imgStyle]} />
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
