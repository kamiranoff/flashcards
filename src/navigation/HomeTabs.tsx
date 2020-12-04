import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens } from './interface';
import HomeStack from './HomeStack';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name={Screens.HOME} component={HomeStack} />
    <Tab.Screen name={Screens.SETTINGS} component={Settings} />
  </Tab.Navigator>
);

export default HomeTabs;
