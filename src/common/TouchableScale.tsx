import React, { FC, ReactNode, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

interface Props {
  children: ReactNode;
  onPress: (e: GestureResponderEvent) => void;
  props: TouchableWithoutFeedbackProps;
}

const TouchableScale: FC<Props> = ({ children, onPress, props }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}>
      <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default TouchableScale;
