import React, { FC, useRef, useState } from 'react';
import { StyleSheet, View, Animated, GestureResponderEvent } from 'react-native';
import useAnimatedPress from '../../../hooks/useAnimatedPress';
import { IconButton, IconButtonWithText } from '../../../common';
import { theme } from '../../../utils';

interface Props {
  onShufflePress: (event: GestureResponderEvent) => void;
  onSortPress: (event: GestureResponderEvent) => void;
  onSharePress: (event: GestureResponderEvent) => void;
}

const Menu: FC<Props> = ({ onShufflePress, onSortPress, onSharePress }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const {
    scale: scale1,
    handlePressIn: handlePressIn1,
    handlePressOut: handlePressOut1,
  } = useAnimatedPress();
  const {
    scale: scale2,
    handlePressIn: handlePressIn2,
    handlePressOut: handlePressOut2,
  } = useAnimatedPress();
  const {
    scale: scale3,
    handlePressIn: handlePressIn3,
    handlePressOut: handlePressOut3,
  } = useAnimatedPress();

  const toggleOpen = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      useNativeDriver: true,
      duration: 200,
    }).start();

    setIsOpen(!isOpen);
  };

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const bgStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };

  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [-30, -60, -90],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  const sortInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });

  const shuffleInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -70, -140],
  });

  const shareInterpolate = animation.interpolate({
    inputRange: [0, 0.25, 0.5, 1],
    outputRange: [0, -70, -140, -210],
  });

  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateX: labelPositionInterpolate,
      },
    ],
  };

  const sortStyle = {
    transform: [
      {
        translateY: sortInterpolate,
      },
      { scale: scale3 },
    ],
  };

  const shuffleStyle = {
    transform: [
      {
        translateY: shuffleInterpolate,
      },
      { scale: scale2 },
    ],
  };

  const shareStyle = {
    transform: [
      {
        translateY: shareInterpolate,
      },
      { scale: scale1 },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, bgStyle]} />
      <IconButtonWithText
        handlePressIn={handlePressIn1}
        handlePressOut={handlePressOut1}
        iconName="share"
        text="Share deck"
        labelAnimatedStyle={labelStyle}
        viewAnimatedStyle={shareStyle}
        onPress={onSharePress}
      />
      <IconButtonWithText
        handlePressIn={handlePressIn2}
        handlePressOut={handlePressOut2}
        iconName="shuffle"
        text="Shuffle cards"
        labelAnimatedStyle={labelStyle}
        viewAnimatedStyle={shuffleStyle}
        onPress={onShufflePress}
      />
      <IconButtonWithText
        handlePressIn={handlePressIn3}
        handlePressOut={handlePressOut3}
        iconName="sort"
        text="Sort cards by incorrect first"
        labelAnimatedStyle={labelStyle}
        viewAnimatedStyle={sortStyle}
        onPress={onSortPress}
      />
      <IconButton onPress={toggleOpen} iconName="menuCurve" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
    right: 0,
    borderRadius: 30,
  },
  button: {
    backgroundColor: theme.colors.good,
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

export { Menu };
