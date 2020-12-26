import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { isIOS, WINDOW_WIDTH } from '../styles/utils';

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.85 : WINDOW_WIDTH * 0.74;

const FlippedCard = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  let v = 0;
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  animatedValue.addListener(({ value }) => {
    v = value;
  });

  const flipCard = () => {
    if (v >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View style={styles.innerContainer}>
      <View style={{ flex: 1 }}>
        <View>
          <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
            <Text>Front</Text>
          </Animated.View>
          <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
            <Text>Back</Text>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={flipCard}>
          <Text>Flip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: ITEM_SIZE * 1.6,
    backgroundColor: 'gray',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 0,
  },
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.6,
    borderRadius: 4,
    backgroundColor: '#94c7b6',
    margin: 0,
    marginBottom: 10,
  },
});
export default FlippedCard;
