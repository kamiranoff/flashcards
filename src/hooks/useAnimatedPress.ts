import { useRef } from 'react';
import { Animated } from 'react-native';

const useAnimatedPress = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      useNativeDriver: true,
      toValue: 0.8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.sequence([
      Animated.timing(scale, {
        useNativeDriver: true,
        toValue: 1.1,
        duration: 100,
      }),
      Animated.timing(scale, {
        useNativeDriver: true,
        toValue: 1,
        duration: 100,
      }),
    ]).start();
  };

  return {
    scale,
    handlePressIn,
    handlePressOut,
  };
};

export default useAnimatedPress;
