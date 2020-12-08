import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, Screens } from './interface';
import Home from '../screens/Home';
import DeckDetail from '../screens/DeckDetail';
import Playground from '../screens/Playground';

const MainStack = createStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <MainStack.Navigator initialRouteName={Screens.HOME}>
    <MainStack.Screen name={Screens.HOME} component={Home} />
    <MainStack.Screen name={Screens.DECK_DETAIL} component={DeckDetail} />
    <MainStack.Screen name={Screens.PLAYGROUND} component={Playground} />
  </MainStack.Navigator>
);

export default HomeStack;
