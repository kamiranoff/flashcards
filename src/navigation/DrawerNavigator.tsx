import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import { DrawerStackParamList, Screens } from './interface';
import SettingsDrawerContent from '../screens/SettingsDrawerContent';
import { RateTheAppStack, GetFreebieStack } from './DrawerStack';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DRAWER_STYLE = {
  backgroundColor: '#f9cdad',
  paddingTop: 20,
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerStyle={DRAWER_STYLE} drawerContent={(props) => <SettingsDrawerContent {...props} />}>
      <Drawer.Screen name={Screens.HOME} component={HomeStack} />
      <Drawer.Screen name={Screens.GET_FREEBIE} component={GetFreebieStack} />
      <Drawer.Screen name={Screens.RATE_THE_APP} component={RateTheAppStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
