import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Create from '../screens/Create';

const Tab = createBottomTabNavigator();

type HomeStackParamList = {
  Home: undefined;
  Create: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal" initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeStack} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
