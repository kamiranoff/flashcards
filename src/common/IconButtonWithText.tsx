import React, { FC } from 'react';
import { Animated, GestureResponderEvent, Image, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import assets from '../assets';
import { theme, typography } from '../utils';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  viewAnimatedStyle: Animated.AnimatedProps<ViewStyle>;
  labelAnimatedStyle: Animated.AnimatedProps<ViewStyle>;
  iconName: 'shuffle' | 'sort' | 'share';
  handlePressOut: (event: GestureResponderEvent) => void;
  handlePressIn: (event: GestureResponderEvent) => void;
}

const IconButtonWithText: FC<Props> = ({
  iconName,
  text,
  viewAnimatedStyle,
  labelAnimatedStyle,
  handlePressOut,
  handlePressIn,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.button, viewAnimatedStyle]}>
        <Animated.Text style={[styles.label, labelAnimatedStyle]}>{text}</Animated.Text>
        <Image source={assets.icons[iconName]} resizeMode="contain" style={styles.img} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    zIndex: 9,
  },
  label: {
    width: 150,
    color: '#FFF',
    position: 'absolute',
    ...typography.h2,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: theme.colors.icon,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
    ...theme.iconButtonShadow,
  },
});

export default IconButtonWithText;
