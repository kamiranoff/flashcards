import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Create from '../screens/Create';
import DeckDetail from '../screens/DeckDetail';
import Home from '../screens/Home';
import { HomeStackParamList, Screens } from './interface';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator<HomeStackParamList>();

const MainStack = createStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <MainStack.Navigator initialRouteName={Screens.HOME}>
      <MainStack.Screen name={Screens.HOME} component={Home} />
      <MainStack.Screen name={Screens.DECK_DETAIL} component={DeckDetail} />
    </MainStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Screens.HOME} component={HomeStack} />
      <Tab.Screen name={Screens.SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
}

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      mode="modal"
      initialRouteName={Screens.HOME}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={HomeTabs} />
      <Stack.Screen name={Screens.CREATE} component={Create} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
