import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import IconButton from './IconButton';
import { DrawerStackParamList } from '../navigation/interface';
import { getPlatformDimension, isIOS, moderateScale } from '../styles/utils';
import Title from './Title';

const TopBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <IconButton onPress={() => navigation.openDrawer()} iconName="menu" />
      </View>
      <Title title="Decks" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    top: getPlatformDimension(20, 20, 5), // Dont like that
    left: moderateScale(16),
    position: 'absolute',
    zIndex: 99,
  },
  container: {
    paddingBottom: isIOS ? 25 : 30,
  },
});

export default TopBar;