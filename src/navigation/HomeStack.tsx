import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList, Screens } from './interface';
import Home from '../screens/Home';
import DeckDetail from '../screens/DeckDetail';

const MainStack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => (
  <MainStack.Navigator initialRouteName={Screens.HOME}>
    <MainStack.Screen name={Screens.HOME} component={Home} />
    <MainStack.Screen name={Screens.DECK_DETAIL} component={DeckDetail} />
  </MainStack.Navigator>
);

export default HomeStack;
