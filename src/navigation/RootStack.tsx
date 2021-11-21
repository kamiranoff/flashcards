import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, Screens } from './types';
import HomeStack from './HomeStack';
import QuestionModal from '../screens/QuestionModal';
import Playground from '../screens/Playground';
import AnswerModal from '../screens/AnswerModal';
import AddDeck from '../screens/Home/AddDeck';
import { verticalTopToBottomTransition } from './utils';
import ShopStack from './ShopStack';
import { LoginOrSignup } from '../screens/LoginOrSignup';
import { LoginViaSms } from '../screens/LoginOrSignup/LoginViaSms';
import { PermissionsProvider } from '../context/PermissionsProvider';
import { Permissions } from '../screens/Modals/Permissions';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <PermissionsProvider>
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={HomeStack} />
      <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
      <Stack.Screen name={Screens.PLAYGROUND} component={Playground} />
      <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
      <Stack.Screen name={Screens.ADD_DECK} component={AddDeck} options={verticalTopToBottomTransition} />
      <Stack.Screen name={Screens.UPGRADE_TO_PRO_MODAL} component={ShopStack} />
      <Stack.Screen name={Screens.LOGIN_OR_SIGNUP} component={LoginOrSignup} />
      <Stack.Screen name={Screens.LOGIN_VIA_SMS} component={LoginViaSms} />
      <Stack.Screen name={Screens.PERMISSIONS} component={Permissions} />
    </Stack.Navigator>
  </PermissionsProvider>
);
