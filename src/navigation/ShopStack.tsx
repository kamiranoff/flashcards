import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens, ShopStackParamList } from './types';
import UpgradeToProModal from '../screens/Modals/UpgradeToProModal';
import ShopModal from '../screens/Modals/ShopModal';

const Stack = createStackNavigator<ShopStackParamList>();

const ShopStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
    <Stack.Screen name={Screens.UPGRADE_TO_PRO_MODAL} component={UpgradeToProModal} />
    <Stack.Screen name={Screens.SHOP_MODAL} component={ShopModal} options={{ gestureEnabled: false }} />
  </Stack.Navigator>
);

export default ShopStack;
