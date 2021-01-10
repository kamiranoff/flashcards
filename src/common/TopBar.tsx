import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import CustomText from './CustomText';
import IconButton from './IconButton';
import { DrawerParamList } from '../navigation/interface';

const TopBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
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
    left: 16,
    position: 'absolute',
    zIndex: 99,
  },
  wrapper: {
    marginTop: 10,
  },
});

export default TopBar;
