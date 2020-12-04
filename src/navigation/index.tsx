import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Create from '../screens/Create';
import { HomeStackParamList, Screens } from './interface';
import HomeTabs from './HomeTabs';

const Stack = createStackNavigator<HomeStackParamList>();

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
