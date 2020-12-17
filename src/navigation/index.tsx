import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { RootStackParamList, Screens } from './interface';
import HomeTabs from './HomeTabs';
import QuestionModal from '../screens/QuestionModal';
import AnswerModal from '../screens/AnswerModal';
import DeckDetail from '../screens/DeckDetail';
import Playground from '../screens/Playground';
import { Easing } from 'react-native';

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal" initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={HomeTabs} />
      <Stack.Screen
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
      <Stack.Screen name={Screens.PLAYGROUND} component={Playground} />
      <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
      <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
