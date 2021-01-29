import {
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';
import { Animated, Easing } from 'react-native';
import { isIOS } from '../utils/device';

export const verticalTopToBottomTransition: StackNavigationOptions = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        delay: isIOS ? 100 : 0,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 500,
      },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
        // transform: [
        //   {
        //     translateY: progress.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [-screen.height, 0],
        //     }),
        //   },
        // ],
      },
    };
  },
};

export const opacityTransition: StackNavigationOptions = {
  animationEnabled: true,
  cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({
    current: { progress },
  }: {
    current: { progress: Animated.AnimatedInterpolation };
  }) => {
    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: 'clamp',
        }),
      },
    };
  },
};

export const horizontalTopToBottomTransition: StackNavigationOptions = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        delay: isIOS ? 100 : 0,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 500,
      },
    },
  },
  cardStyleInterpolator: ({ current: { progress }, layouts: { screen } }) => {
    return {
      cardStyle: {
        opacity: progress,
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

export const horizontalAnimation: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, layouts }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const smoothOpacityTransition: StackNavigationOptions = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: 'timing',
      config: { duration: 300, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
