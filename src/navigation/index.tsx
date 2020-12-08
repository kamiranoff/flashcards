import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, Screens } from './interface';
import HomeTabs from './HomeTabs';
import QuestionModal from '../screens/QuestionModal';
import AnswerModal from '../screens/AnswerModal';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal" initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={HomeTabs} />
      <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
      <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
