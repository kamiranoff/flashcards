import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import AppText from './AppText';
import { theme } from '../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const GeneralAlert = () => {
  const bounceVal = useRef(new Animated.Value(-100)).current;
  const { error } = useSelector((state: RootState) => state.decks);
  const bounceConfig = {
    velocity: 3,
    tension: 2,
    friction: 8,
    useNativeDriver: true,
  };

  useEffect(() => {
    const runAnimation = (value = 0) =>
      Animated.spring(bounceVal, {
        toValue: value,
        ...bounceConfig,
      }).start();

    if (error) {
      runAnimation();
    }
    const timer = setTimeout(() => {
      runAnimation(-100);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, bounceConfig, bounceVal]);

  if (!error) {
    return null;
  }
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: bounceVal }] }]}>
      <AppText size="h2">General Alert</AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.success,
    height: 100,
  },
});
export default GeneralAlert;
