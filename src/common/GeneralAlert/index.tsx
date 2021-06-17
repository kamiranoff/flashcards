import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { theme } from '../../utils';
import animations from '../../assets/animations';
import AppText from '../AppText';
import { isIphoneWithNotch } from '../../utils/device';

export enum NotificationMessages {
  UPDATE = 'Successfully updated',
  THANK_YOU = 'Thank you so so much!',
  ERROR = 'Something went wrong. Please try again.',
  NETWORK_ERROR = 'It seems you are offline',
}

interface Props {
  text?: NotificationMessages;
  onAnimationFinish?: () => void;
}

export interface GeneralAlertRef {
  startAnimation: (notificationMessage?: NotificationMessages) => void;
}

const GeneralAlert = forwardRef<GeneralAlertRef, Props>(({ text, onAnimationFinish }, ref) => {
  const [message, setMessage] = useState(text || NotificationMessages.ERROR);

  const bounceVal = useRef(new Animated.Value(isIphoneWithNotch() ? -144 : -100)).current;

  const isThankYou = message === NotificationMessages.THANK_YOU;
  const isError = message === NotificationMessages.ERROR;
  const isNetworkError = message === NotificationMessages.NETWORK_ERROR;

  const bounceConfig = {
    velocity: 3,
    tension: 2,
    friction: 8,
    useNativeDriver: true,
  };

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    startAnimation(notificationMessage?: NotificationMessages) {
      if (notificationMessage) {
        setMessage(notificationMessage);
      }
      runAnimation();
    },
  }));

  const runAnimation = () => {
    Animated.sequence([
      Animated.spring(bounceVal, {
        toValue: 0,
        ...bounceConfig,
      }),
      Animated.spring(bounceVal, {
        delay: 3000,
        toValue: isIphoneWithNotch() ? -144 : -100,
        ...bounceConfig,
      }),
    ]).start(onAnimationFinish);
  };

  const renderContent = (m: NotificationMessages) => {
    if (isError || isNetworkError) {
      return (
        <>
          <View style={styles.lottie}>
            <LottieView
              source={isError ? animations.thumbsDown : animations.dish}
              autoPlay
              loop
              style={isError ? styles.errorIcon : styles.networkErrorIcon}
            />
          </View>
          <AppText size="p" centered textStyle={[styles.text]}>
            {m}
          </AppText>
        </>
      );
    }
    return (
      <>
        <View style={styles.lottie}>
          <LottieView
            source={isThankYou ? animations.success : animations.thumbsUp}
            autoPlay
            loop
            style={styles.icon}
          />
        </View>
        <AppText
          size="p"
          centered
          textStyle={[styles.text, { color: isThankYou ? '#FF7373' : theme.colors.border }]}>
          {message}
        </AppText>
      </>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: bounceVal }] },
        isNetworkError && { backgroundColor: theme.colors.offline },
        isError && { backgroundColor: theme.colors.warning },
      ]}>
      {renderContent(message)}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.success,
    height: isIphoneWithNotch() ? 114 : 80,
  },
  lottie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    paddingTop: 10,
    color: theme.colors.border,
    fontWeight: '600',
    paddingBottom: 2,
  },
  errorIcon: {
    height: 200,
  },
  networkErrorIcon: {
    height: 80,
  },
  icon: {
    width: 80,
    height: 60,
  },
});

export default GeneralAlert;
