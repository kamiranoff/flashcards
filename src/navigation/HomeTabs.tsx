import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens } from './interface';
import Settings from '../screens/Settings';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name={Screens.HOME} component={Home} />
    <Tab.Screen name={Screens.SETTINGS} component={Settings} />
  </Tab.Navigator>
);

export default HomeTabs;
