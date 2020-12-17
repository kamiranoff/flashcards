import React, { FC, useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface Props {
  text: string;
  onPress: (e: GestureResponderEvent) => void;
}

const Button: FC<Props> = ({ text, onPress }) => {
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
            <Text style={styles.white}>{text}</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
  },
  height: {
    backgroundColor: 'rgba(44, 130, 201, .2)',
    borderRadius: 12,
  },
  inner: {
    height: '100%',
    backgroundColor: 'rgba(44, 130, 201, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Button;
