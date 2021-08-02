import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode | ReactNode[];
  scaleRatio?: number;
  top?: number;
  duration?: number;
  styles?: StyleProp<ViewStyle>;
};

const AnimatedView: FC<Props> = ({
  scaleRatio = 0.95,
  top = 100,
  duration = 500,
  children,
  styles = null,
}) => {
  const yPosition = useRef(new Animated.Value(top)).current;

  useEffect(() => {
    Animated.timing(yPosition, {
      duration,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  const getStyle = () => {
    const scale = yPosition.interpolate({
      inputRange: [0, top],
      outputRange: [1, scaleRatio], // 1.5 => 0.8 - (1 / 10) = -2
    });
    const opacity = yPosition.interpolate({
      inputRange: [0, top],
      outputRange: [1, 0.3],
    });
    return {
      opacity,
      transform: [
        {
          scale,
        },
        {
          translateY: yPosition,
        },
      ],
    };
  };

  return <Animated.View style={[getStyle(), styles]}>{children}</Animated.View>;
};

export { AnimatedView };
