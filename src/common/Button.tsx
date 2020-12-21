import React, { FC, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View, StyleSheet, GestureResponderEvent, Image } from 'react-native';
import assets from '../assets';

interface Props {
  onPress: (e: GestureResponderEvent) => void;
}

const Button: FC<Props> = ({ onPress }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const setTiming = (value: number, duration: number) => {
    Animated.timing(animation, {
      useNativeDriver: false,
      toValue: value,
      duration,
    }).start();
  };
  const handleOnPressIn = () => setTiming(1, 100);
  const handleOnPressOut = () => setTiming(0, 50);

  const heightStyle = {
    marginTop: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 0],
    }),
    paddingBottom: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0],
    }),
  };

  const inner = {
    borderRadius: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 16],
    }),
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
      <View style={styles.button}>
        <Animated.View style={[styles.height, heightStyle]}>
          <Animated.View style={[styles.inner, inner]}>
            <Image source={assets.icons.plus} style={styles.icon} resizeMode="contain" />
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: 70,
  },
  height: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  inner: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Button;
