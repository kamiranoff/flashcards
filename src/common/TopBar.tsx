import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import CustomText from './CustomText';
import IconButton from './IconButton';
import { DrawerStackParamList } from '../navigation/interface';
import { moderateScale } from '../styles/utils';

const TopBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParamList>>();
  return (
    <View>
      <View style={styles.buttonContainer}>
        <IconButton onPress={() => navigation.openDrawer()} iconName="menu" />
      </View>
      <View style={styles.wrapper}>
        <CustomText size="h1" centered>
          Decks
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    top: moderateScale(20),
    left: moderateScale(16),
    position: 'absolute',
    zIndex: 99,
  },
  wrapper: {
    marginTop: moderateScale(20),
  },
});

export default TopBar;
