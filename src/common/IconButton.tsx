import React, { FC, memo } from 'react';
import {
  Image,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import assets from '../assets';
import { HIT_SLOP } from '../utils/device';
import { theme } from '../utils';

export interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  iconName:
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
    | 'confusedFace'
    | 'notSureFace'
    | 'happyFace';
  imgStyle?: ImageStyle;
  style?: ViewStyle;
}

const IconButton: FC<IconButtonProps> = memo(({ onPress, iconName, style, imgStyle }) => (
  <TouchableOpacity onPress={onPress} hitSlop={HIT_SLOP} style={[styles.container, style]}>
    <Image source={assets.icons[iconName]} resizeMode="contain" style={[styles.img, imgStyle]} />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    zIndex: 9,
  },
  container: {
    backgroundColor: theme.colors.icon,
    width: 40,
    height: 40,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    ...theme.iconButtonShadow,
  },
});

export default IconButton;
