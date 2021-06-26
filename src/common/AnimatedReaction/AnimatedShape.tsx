import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { getRandomInt } from './utils';

type Props = {
  height: number;
  containerStyle: {
    right: number;
  };
  children: ReactNode | ReactNode[];
  id: number;
  onShapeAnimationFinish: (id: number) => void;
};

const AnimatedShape: FC<Props> = ({ id, onShapeAnimationFinish, height, containerStyle, children }) => {
  const position = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    runAnimation();
  }, []);

  const runAnimation = () => {
    Animated.timing(position, {
      duration: getRandomInt(2000, 4000),
      useNativeDriver: true,
      toValue: height * -1,
      delay: 0,
    }).start(() => {
      onShapeAnimationFinish(id);
    });
  };

  const getAnimationStyle = () => {
    const negativeHeight = height * -1;

    const yAnimation = position.interpolate({
      inputRange: [negativeHeight, 0],
      outputRange: [0, height - 200],
    });

    const opacity = yAnimation.interpolate({
      inputRange: [0, height / 2, height / 1.5, height],
      outputRange: [0, 0.7, 1, 0],
    });

    const scale = yAnimation.interpolate({
      inputRange: [0, height / 2, height / 1.5, height],
      outputRange: [1, 0.9, 1.1, 1],
    });

    const xAnimation = yAnimation.interpolate({
      inputRange: [0, height / 2, height],
      outputRange: [0, 15, 0],
    });

    const rotate = yAnimation.interpolate({
      inputRange: [0, height / 4, height / 3, height / 2, height],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg'],
    });

    return {
      transform: [
        { translateY: yAnimation },
        { scale },
        { rotate },
        {
          translateX: xAnimation,
        },
      ],
      opacity,
    };
  };

  return (
    <Animated.View style={[styles.shapeWrapper, getAnimationStyle(), containerStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shapeWrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

export { AnimatedShape };
