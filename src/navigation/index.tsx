import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, Screens } from './interface';
import QuestionModal from '../screens/QuestionModal';
import AnswerModal from '../screens/AnswerModal';
import Playground from '../screens/Playground';
import AlertModal from '../common/AlertModal';
import DrawerNavigator from './DrawerNavigator';
import AddDeck from '../screens/Home/AddDeck';
import { opacityTransition, verticalTopToBottomTransition } from './utils';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal" initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.DRAWER} component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
      <Stack.Screen name={Screens.PLAYGROUND} component={Playground} />
      <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
      <Stack.Screen name={Screens.ADD_DECK} component={AddDeck} options={verticalTopToBottomTransition} />
      <Stack.Screen name={Screens.ALERT} component={AlertModal} options={opacityTransition} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
