import React, { FC } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList, Screens } from '../../navigation/interface';
import { sendEmail } from '../../lib';
import { StyleSheet } from 'react-native';
import { Icon } from '../../common';
import { typography } from '../../utils';

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

  return (
    <DrawerContentScrollView contentContainerStyle={{ paddingTop: 20, marginLeft: -5 }}>
      <DrawerItem
        label="Contact"
        labelStyle={styles.labelStyle}
        onPress={handleContact}
        icon={() => <Icon name="chat" bgColor="#c9e5dc" />}
      />
      <DrawerItem
        labelStyle={styles.labelStyle}
        label="Help improve the app"
        icon={() => <Icon name="trash" bgColor="#e1d1a6" />}
        onPress={() => navigation.navigate(Screens.GET_FREEBIE)}
      />
      <DrawerItem
        label="Request feature"
        labelStyle={styles.labelStyle}
        onPress={() => navigation.navigate(Screens.REQUEST_FEATURE)}
        icon={() => <Icon name="magicWanda" bgColor="#ffad8b" />}
      />
      <DrawerItem
        style={[styles.space, styles.top]}
        label="Share App"
        labelStyle={styles.labelStyle}
        icon={() => <Icon name="heartCupid" bgColor="#d8c8bd" />}
        onPress={() => navigation.navigate(Screens.SHARE_THE_APP)}
      />
      <DrawerItem
        labelStyle={styles.labelStyle}
        style={[styles.base, styles.bottom]}
        icon={() => <Icon name="star" bgColor="#eceae8" />}
        label="Rate the App"
        onPress={() => navigation.navigate(Screens.RATE_THE_APP)}
      />
      <DrawerItem
        labelStyle={styles.labelStyle}
        icon={() => <Icon name="free" bgColor="#d9dbed" />}
        style={[styles.space]}
        label="Get free deck"
        onPress={() => navigation.navigate(Screens.GET_FREEBIE)}
      />
      <DrawerItem
        labelStyle={styles.labelStyle}
        icon={() => <Icon name="student" bgColor="#94c7b6" />}
        label="Upgrade to PRO LEARNER"
        onPress={() => navigation.navigate(Screens.UPGRADE)}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    ...typography.drawerLabel,
    marginLeft: -22,
  },
  base: {
    marginVertical: 0,
  },
  space: {
    marginTop: 20,
    marginBottom: 0,
  },
  top: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottom: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default SettingsDrawerContent;
