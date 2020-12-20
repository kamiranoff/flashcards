import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, Screens } from './interface';
import HomeStack from './HomeStack';
import QuestionModal from '../screens/QuestionModal';
import AnswerModal from '../screens/AnswerModal';
import Playground from '../screens/Playground';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal" initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={HomeStack} />
      <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
      <Stack.Screen name={Screens.PLAYGROUND} component={Playground} />
      <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
