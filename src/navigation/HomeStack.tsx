import React from 'react';
import { RootStackParamList, Screens } from './interface';
import Home from '../screens/Home';
import DeckDetail from '../screens/DeckDetail';
import Playground from '../screens/Playground';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const MainStack = createSharedElementStackNavigator<RootStackParamList>();

// const options = {
//   gestureEnabled: false,
//   headerBackTitleVisible: false,
//   transitionSpec: {
//     open: {
//       animation: 'timing',
//       config: { duration: 400, easing: Easing.inOut(Easing.ease) },
//     },
//     close: {
//       animation: 'timing',
//       config: { duration: 400, easing: Easing.inOut(Easing.ease) },
//     },
//   },
//   cardStyleInterpolator: ({ current: { progress } }) => {
//     return {
//       cardStyle: {
//         opacity: progress,
//       },
//     };
//   },
// };

const HomeStack = () => (
  <MainStack.Navigator initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
    <MainStack.Screen name={Screens.HOME} component={Home} />
    <MainStack.Screen
      name={Screens.DECK_DETAIL}
      component={DeckDetail}
      options={() => ({
        gestureEnabled: false,
        // transitionSpec: {
        //   open: { animation: 'timing', config: { duration: 1000 } },
        //   close: { animation: 'timing', config: { duration: 1000 } },
        // },
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
    <MainStack.Screen name={Screens.PLAYGROUND} component={Playground} />
  </MainStack.Navigator>
);

export default HomeStack;
