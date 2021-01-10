import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contact from '../screens/Contact';
import HomeStack from './HomeStack';
import { DrawerParamList, Screens } from './interface';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const ContactStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name="Contact" component={Contact} />
  </Stack.Navigator>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={Screens.HOME} component={HomeStack} />
      <Drawer.Screen name={Screens.CONTACT} component={ContactStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
