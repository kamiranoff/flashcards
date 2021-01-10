import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import Contact from '../screens/Contact';
import HomeStack from './HomeStack';
import { DrawerStackParamList, Screens } from './interface';

const Drawer = createDrawerNavigator<DrawerStackParamList>();
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

const DRAWER_STYLE = {
  backgroundColor: '#f9cdad',
  paddingTop: 20,
};

const DRAWER_ITEM_BASE_STYLE = {
  backgroundColor: 'white',
  borderBottomColor: 'gray',
  marginVertical: 0,
};

const DRAWER_ITEM_TOP_STYLE = {
  borderTopWidth: 0.5,
  borderRightWidth: 0.5,
  borderLeftWidth: 0.5,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
};

const DRAWER_ITEM_BOTTOM_STYLE = {
  backgroundColor: 'white',
  borderBottomColor: 'gray',
  borderBottomWidth: 0.5,
  borderRightWidth: 0.5,
  borderLeftWidth: 0.5,
  borderBottomRightRadius: 1,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderTopWidth: 0.5,
};

const DRAWER_ITEM_MIDDLE_STYLE = {
  backgroundColor: 'white',
  borderBottomColor: 'gray',
  borderRadius: 0,
  borderWidth: 0.5,
  borderBottomWidth: 0,
};

type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, any>; // FIXME

export interface Props {
  navigation: DrawerScreenNavigationProp & any;
}

const CustomDrawerContent: FC<Props> = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        style={[DRAWER_ITEM_BASE_STYLE, DRAWER_ITEM_TOP_STYLE]}
        label="Contact"
        onPress={() => navigation.navigate(Screens.CONTACT)}
      />
      <DrawerItem
        style={[DRAWER_ITEM_BASE_STYLE, DRAWER_ITEM_MIDDLE_STYLE]}
        label="Help improve the app"
        onPress={() => navigation.navigate(Screens.CONTACT)}
      />
      <DrawerItem
        style={[DRAWER_ITEM_BASE_STYLE, DRAWER_ITEM_BOTTOM_STYLE]}
        label="Request feature"
        onPress={() => navigation.navigate(Screens.CONTACT)}
      />
      <DrawerItem
        style={[{ marginTop: 20, marginBottom: 0, backgroundColor: 'white' }, DRAWER_ITEM_TOP_STYLE]}
        label="Share App"
        onPress={() => navigation.navigate(Screens.CONTACT)}
      />
      <DrawerItem
        style={[DRAWER_ITEM_BASE_STYLE, DRAWER_ITEM_BOTTOM_STYLE]}
        label="Rate the App"
        onPress={() => navigation.navigate(Screens.CONTACT)}
      />
      <DrawerItem
        style={[{ marginTop: 20, marginBottom: 0, backgroundColor: 'white' }, DRAWER_ITEM_TOP_STYLE]}
        label="Get free deck"
        onPress={() => navigation.navigate(Screens.CONTACT)}
      />
      <DrawerItem
        style={[DRAWER_ITEM_BASE_STYLE, DRAWER_ITEM_BOTTOM_STYLE]}
        label="Upgrade to PRO LEARNER"
        onPress={() => navigation.navigate(Screens.CONTACT)}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerStyle={DRAWER_STYLE} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={Screens.HOME} component={HomeStack} />
      <Drawer.Screen name={Screens.CONTACT} component={ContactStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
