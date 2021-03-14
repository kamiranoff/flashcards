import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import AppText from './AppText';
import { theme } from '../utils';
import animations from '../assets/animations';

const GeneralAlert = ({ startExecute, hasIcon = true }: { startExecute: boolean; hasIcon?: boolean }) => {
  const bounceVal = useRef(new Animated.Value(-100)).current;
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

    if (startExecute) {
      runAnimation();
    }
    const timer = setTimeout(() => {
      runAnimation(-100);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [bounceConfig, bounceVal, startExecute]);

  if (!startExecute) {
    return null;
  }
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: bounceVal }] }]}>
      {hasIcon && (
        <View style={styles.lottie}>
          <LottieView source={animations.success} autoPlay loop style={styles.icon} />
        </View>
      )}
      <AppText size="h3" centered textStyle={hasIcon ? styles.text : styles.generic}>
        {hasIcon ? 'Thank you so so much!' : 'Cards successfully updated'}
      </AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.success,
    height: 80,
  },
  lottie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    paddingTop: 10,
    color: '#FF7373',
    fontWeight: '800',
    paddingBottom: 5,
  },
  generic: {
    color: theme.colors.border,
    fontWeight: '800',
    paddingVertical: 20,
  },
  icon: {
    width: 80,
    height: 70,
  },
});
export default GeneralAlert;
