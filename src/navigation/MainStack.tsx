import React from 'react';
import { Screens } from './interface';
import Home from '../screens/Home';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import DeckDetail from '../screens/DeckDetail';
import { Easing } from 'react-native';

const MainStack = createSharedElementStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
    <MainStack.Screen name={Screens.HOME} component={Home} />
    <MainStack.Screen
      name={Screens.DECK_DETAIL}
      component={DeckDetail}
      options={() => ({
        gestureEnabled: false,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: { duration: 200, easing: Easing.inOut(Easing.ease) },
          },
          close: {
            animation: 'timing',
            config: { duration: 100, easing: Easing.inOut(Easing.ease) },
          },
        },
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      })}
      sharedElements={(route) => {
        const { id } = route.params;
        return [{ id: `item.${id}` }, { id: 'general.bg' }];
      }}
    />
  </MainStack.Navigator>
);

export default MainStackScreen;
