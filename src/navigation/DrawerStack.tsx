import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { DrawerStackParamList, Screens } from './interface';
import { IconButton } from '../common';
import GetFreebie from '../screens/GetFreebie';
import RateTheApp from '../screens/RateTheApp';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#FFF',
  },
  headerTintColor: '#2c2c2d',
};

type GetFreeDeckScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.GET_FREEBIE>;
type RateUsScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.RATE_THE_APP>;

const options = ({ navigation }: { navigation: GetFreeDeckScreenNavigationProp }) => ({
  title: 'Get Freebie',
  headerLeft: () => <IconButton iconName="close" onPress={() => navigation.goBack()} style={{ left: 10 }} />,
});

const rateOptions = ({ navigation }: { navigation: RateUsScreenNavigationProp }) => ({
  headerLeft: () => <IconButton iconName="close" onPress={() => navigation.goBack()} style={{ left: 10 }} />,
  title: 'Rate us',
});

const GetFreebieStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.GET_FREEBIE} component={GetFreebie} options={options} />
  </Stack.Navigator>
);

const RateTheAppStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name={Screens.RATE_THE_APP} component={RateTheApp} options={rateOptions} />
  </Stack.Navigator>
);

export { GetFreebieStack, RateTheAppStack };
