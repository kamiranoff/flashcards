import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerStackParamList, Screens } from './interface';
import { IconButton } from '../common';
import GetFreebie from '../screens/DrawerSettings/GetFreebie';
import RateTheApp from '../screens/DrawerSettings/RateTheApp';
import ShareTheApp from '../screens/DrawerSettings/ShareTheApp';
import UpgradeToPro from '../screens/DrawerSettings/UpgradeToPro';
import RequestFeature from '../screens/DrawerSettings/RequestFeature';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { typography } from '../utils';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0,
  },
  headerTintColor: 'red',
  style: {
    fontFamily: typography.hero.fontFamily,
    fontSize: 5,
  },
};

// FIXME: stacks repetition - do I even need them?
const options = ({ navigation }: { navigation: DrawerNavigationProp<DrawerStackParamList> }) => ({
  headerLeft: () => (
    <IconButton iconName="x" onPress={() => navigation.goBack()} style={{ left: 10, top: 10 }} />
  ),
  title: '',
});

const GetFreebieStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.GET_FREEBIE} component={GetFreebie} options={options} />
  </Stack.Navigator>
);

const RateTheAppStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.RATE_THE_APP} component={RateTheApp} options={options} />
  </Stack.Navigator>
);

const ShareTheAppStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.SHARE_THE_APP} component={ShareTheApp} options={options} />
  </Stack.Navigator>
);

const UpgradeToProStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.UPGRADE} component={UpgradeToPro} options={options} />
  </Stack.Navigator>
);

const RequestFeatureStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.REQUEST_FEATURE} component={RequestFeature} options={options} />
  </Stack.Navigator>
);

export { GetFreebieStack, RateTheAppStack, ShareTheAppStack, UpgradeToProStack, RequestFeatureStack };
