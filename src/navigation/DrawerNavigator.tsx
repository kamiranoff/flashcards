import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import { DrawerStackParamList, Screens } from './interface';
import SettingsDrawerContent from '../screens/DrawerSettings/SettingsDrawerContent';
import {
  RateTheAppStack,
  GetFreebieStack,
  ShareTheAppStack,
  UpgradeToProStack,
  RequestFeatureStack,
} from './DrawerStack';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DRAWER_STYLE = {
  backgroundColor: '#f9f9f9',
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={DRAWER_STYLE}
      drawerContent={(props) => <SettingsDrawerContent {...props} />}>
      <Drawer.Screen name={Screens.HOME} component={HomeStack} />
      <Drawer.Screen name={Screens.GET_FREEBIE} component={GetFreebieStack} />
      <Drawer.Screen name={Screens.RATE_THE_APP} component={RateTheAppStack} />
      <Drawer.Screen name={Screens.SHARE_THE_APP} component={ShareTheAppStack} />
      <Drawer.Screen name={Screens.UPGRADE} component={UpgradeToProStack} />
      <Drawer.Screen name={Screens.REQUEST_FEATURE} component={RequestFeatureStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
