import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import HomeStack from './HomeStack';
import { DrawerStackParamList, Screens } from './interface';
import DrawerContent from '../screens/Drawer/DrawerContent';
import { IconButton } from '../common';
import GetFreebie from '../screens/Drawer/GetFreebie';
import RateTheApp from '../screens/Drawer/RateTheApp';
import ShareTheApp from '../screens/Drawer/ShareTheApp';
import RequestFeature from '../screens/Drawer/RequestFeature';
import Contact from '../screens/Drawer/Contact';
import UpgradeToPro from '../screens/Drawer/UpgradeToPro';
import { theme } from '../utils';
import { getPlatformDimension, moderateScale } from '../utils/device';

const Drawer = createDrawerNavigator<DrawerStackParamList>();
const Stack = createStackNavigator<DrawerStackParamList>();

const setOptions = (navigation) => ({
  headerTransparent: true,
  headerTitle: '',
  gestureEnabled: false, // prevent dismiss the screen by swiping
  headerLeft: () => (
    <IconButton iconName="menuCurve" onPress={() => navigation.openDrawer()} style={styles.menuIcon} />
  ),
});

const ScreensDrawer = ({ navigation, style }: { navigation: any; style: ViewStyle }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.scene, style])}>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.HOME}
          component={HomeStack}
          options={{ headerTransparent: true, headerTitle: '' }}
        />
        <Stack.Screen name={Screens.GET_FREEBIE} component={GetFreebie} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.RATE_THE_APP} component={RateTheApp} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.SHARE_THE_APP} component={ShareTheApp} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.UPGRADE} component={UpgradeToPro} options={setOptions(navigation)} />
        <Stack.Screen
          name={Screens.REQUEST_FEATURE}
          component={RequestFeature}
          options={setOptions(navigation)}
        />
        <Stack.Screen name={Screens.CONTACT} component={Contact} options={setOptions(navigation)} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerNavigator = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  // animate border radius of the scene screen, border radius dont work wth shadow FIXME
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={styles.drawer}
        overlayColor="transparent"
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
        }}
        // set the scene background to transparent
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => {
          // FIXME - settingProgress should not be done like this
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name={Screens.SCREENS}>
          {(props) => <ScreensDrawer {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    ...theme.iconButtonShadow,
  },
  drawer: {
    backgroundColor: 'transparent',
    width: '75%',
  },
  menuIcon: {
    left: moderateScale(16),
    top: getPlatformDimension(20, 20, 5), // Dont like that
  },
});

export default DrawerNavigator;
