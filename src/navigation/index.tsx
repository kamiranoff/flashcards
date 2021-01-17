import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { RootStackParamList, Screens } from './interface';
import QuestionModal from '../screens/QuestionModal';
import AnswerModal from '../screens/AnswerModal';
import Playground from '../screens/Playground';
import AlertModal from '../common/AlertModal';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const alertOptions = {
  animationEnabled: true,
  cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }: { current: { progress: Animated.AnimatedInterpolation } }) => {
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

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal" initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.DRAWER} component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
      <Stack.Screen name={Screens.PLAYGROUND} component={Playground} />
      <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
      <Stack.Screen name={Screens.ALERT} component={AlertModal} options={alertOptions} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
