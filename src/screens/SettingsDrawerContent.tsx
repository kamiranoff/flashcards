import React, { FC } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList, Screens } from '../navigation/interface';
import { sendEmail } from '../utils';
import { StyleSheet } from 'react-native';

type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, any>; // FIXME

export interface Props {
  navigation: DrawerScreenNavigationProp & any;
}

const SettingsDrawerContent: FC<Props> = ({ navigation }) => {
  const handleContact = () => {
    sendEmail('czaplaanita@gmail.com', 'Hello from FlashCard App!').then(() => {
      console.log('Our email successful provided to device mail ');
    });
  };

  const handleRequestFeature = () => {
    sendEmail('czaplaanita@gmail.com', 'Request feature!').then(() => {
      console.log('Our email successful provided to device mail ');
    });
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem style={[styles.base, styles.top]} label="Contact" onPress={handleContact} />
      <DrawerItem
        style={[styles.base, styles.middle]}
        label="Help improve the app"
        onPress={() => navigation.navigate(Screens.GET_FREEBIE)}
      />
      <DrawerItem style={[styles.base, styles.bottom]} label="Request feature" onPress={handleRequestFeature} />
      <DrawerItem style={[styles.space, styles.top]} label="Share App" onPress={() => navigation.navigate(Screens.GET_FREEBIE)} />
      <DrawerItem
        style={[styles.base, styles.bottom]}
        label="Rate the App"
        onPress={() => navigation.navigate(Screens.RATE_THE_APP)}
      />
      <DrawerItem
        style={[styles.space, styles.top]}
        label="Get free deck"
        onPress={() => navigation.navigate(Screens.GET_FREEBIE)}
      />
      <DrawerItem
        style={[styles.base, styles.bottom]}
        label="Upgrade to PRO LEARNER"
        onPress={() => navigation.navigate(Screens.GET_FREEBIE)}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    marginVertical: 0,
  },
  space: {
    marginTop: 20,
    marginBottom: 0,
    backgroundColor: 'white',
  },
  top: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottom: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomRightRadius: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0.5,
  },
  middle: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderRadius: 0,
    borderWidth: 0.5,
    borderBottomWidth: 0,
  },
});

export default SettingsDrawerContent;
