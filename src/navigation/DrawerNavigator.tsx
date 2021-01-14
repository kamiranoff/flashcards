import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import { DrawerStackParamList, Screens } from './interface';
import SettingsDrawerContent from '../screens/SettingsDrawerContent';
import GetFreebie from '../screens/GetFreebie';

const Drawer = createDrawerNavigator<DrawerStackParamList>();
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const GetFreebieNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.GET_FREEBIE} component={GetFreebie} />
  </Stack.Navigator>
);

const DRAWER_STYLE = {
  backgroundColor: '#f9cdad',
  paddingTop: 20,
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerStyle={DRAWER_STYLE} drawerContent={(props) => <SettingsDrawerContent {...props} />}>
      <Drawer.Screen name={Screens.HOME} component={HomeStack} />
      <Drawer.Screen name={Screens.GET_FREEBIE} component={GetFreebieNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
