import React, { FC } from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList, Screens } from '../../navigation/interface';
import { StyleSheet } from 'react-native';
import { Icon } from '../../common';
import { theme, typography } from '../../utils';
import { isIOS } from '../../utils/device';

type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, any>; // FIXME

export interface Props {
  navigation: DrawerScreenNavigationProp & any; // FIXME
}

const DrawerContent: FC<Props> = ({ navigation }) => {
  return (
    <DrawerContentScrollView contentContainerStyle={styles.scrollView} scrollEnabled={false}>
      <View style={styles.topContent}>
        <DrawerItem
          label="Home"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate(Screens.HOME)}
          icon={() => <Icon name="home" bgColor={theme.colors.drawerItem.home} />}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Help improve the app"
          icon={() => <Icon name="speedometer" bgColor={theme.colors.drawerItem.improve} />}
          onPress={() => navigation.navigate(Screens.IMPROVE_THE_APP)}
        />
        <DrawerItem
          label="Request feature"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate(Screens.REQUEST_FEATURE)}
          icon={() => <Icon name="magicWanda" bgColor={theme.colors.drawerItem.feature} />}
        />
        <DrawerItem
          style={[styles.space, styles.top]}
          label="Share App"
          labelStyle={styles.labelStyle}
          icon={() => <Icon name="heartCupid" bgColor={theme.colors.drawerItem.share} />}
          onPress={() => navigation.navigate(Screens.SHARE_THE_APP)}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          style={[styles.base, styles.bottom]}
          icon={() => <Icon name="star" bgColor={theme.colors.drawerItem.rate} />}
          label="Rate the App"
          onPress={() => navigation.navigate(Screens.RATE_THE_APP)}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          icon={() => <Icon name="free" bgColor={theme.colors.drawerItem.freeDeck} />}
          style={[styles.space]}
          label="Get free deck"
          onPress={() => navigation.navigate(Screens.GET_FREEBIE)}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          icon={() => <Icon name="student" bgColor={theme.colors.drawerItem.upgrade} />}
          label="Upgrade to PRO"
          onPress={() => navigation.navigate(Screens.UPGRADE)}
        />
        <DrawerItem
          label="Contact us"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate(Screens.CONTACT)}
          icon={() => <Icon name="chat" bgColor={theme.colors.drawerItem.contact} />}
        />
      </View>
      <View>
        <DrawerItem
          labelStyle={styles.bottomLabelStyle}
          label="FlashCards v1.0"
          onPress={() => navigation.navigate(Screens.UPGRADE)}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: -5,
    flex: 1,
  },
  topContent: {
    justifyContent: 'center',
    flex: 1,
  },
  labelStyle: {
    ...typography.drawerLabel,
    marginLeft: -22,
    marginTop: isIOS ? 0 : -10,
  },
  bottomLabelStyle: {
    ...typography.p,
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

export default DrawerContent;
