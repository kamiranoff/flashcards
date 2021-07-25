import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { TransitionPresets } from '@react-navigation/stack';
import { Screens } from './types';
import Home from '../screens/Home';
import DeckDetail from '../screens/DeckDetail';
import { smoothOpacityTransition } from './utils';

const SharedHomeStack = createSharedElementStackNavigator();

export const iosTransitionSpec: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 600,
    damping: 100,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const HomeStackScreen = () => (
  <SharedHomeStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: {
        backgroundColor: 'transparent',
      },
      ...TransitionPresets.ModalSlideFromBottomIOS,
      transitionSpec: {
        open: iosTransitionSpec,
        close: {
          animation: 'timing',
          config: {},
        },
      },
      cardStyleInterpolator: ({ current: { progress } }) => {
        return {
          cardStyle: {
            opacity: progress,
          },
        };
      },
    }}
    mode="modal">
    <SharedHomeStack.Screen name={Screens.HOME} component={Home} options={() => smoothOpacityTransition} />
    <SharedHomeStack.Screen
      name={Screens.DECK_DETAIL}
      component={DeckDetail}
      options={() => smoothOpacityTransition}
      sharedElementsConfig={(route) => {
        const { id } = route.params;
        return [{ id: `item.${id}`, animation: 'fade-in' }];
      }}
    />
  </SharedHomeStack.Navigator>
);

export default HomeStackScreen;
