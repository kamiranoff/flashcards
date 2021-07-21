import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList } from '../../navigation/types';
import { IconButton, Title } from '../../common';
import AddButton from '../../common/AddButton';
import { getPlatformDimension, isIOS, moderateScale } from '../../utils/device';

type Props = {
  handleOpenBottomModal: () => void;
  handleNavigateToAddDeck: () => void;
};

const Header: FC<Props> = ({ handleOpenBottomModal, handleNavigateToAddDeck }) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParamList>>();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <IconButton onPress={() => navigation.openDrawer()} iconName="menuCurve" />
        </View>
        <Title title="Decks" />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <IconButton onPress={handleOpenBottomModal} iconName="codebar" style={styles.codeIcon} />
          <AddButton onOpenModal={handleNavigateToAddDeck} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    top: getPlatformDimension(20, 20, 5), // Dont like that
    left: moderateScale(10),
    position: 'absolute',
    zIndex: 9,
  },
  container: {
    zIndex: 9,
    paddingBottom: isIOS ? 25 : 20,
  },
  rightContainer: {
    zIndex: 9,
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50),
    right: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
  },
  codeIcon: {
    marginRight: 10,
  },
});

export { Header };
