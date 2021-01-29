import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useOpacity = () => {
  const opacityVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityVal, {
      toValue: 1,
      delay: 200,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [opacityVal]);

  return { opacityVal };
};

export default useOpacity;
