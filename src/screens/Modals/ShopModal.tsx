import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackButton, Container } from '../../common';
import { Screens, ShopStackNavigationProp } from '../../navigation/types';
import Content from '../Drawer/Shop/Content';
import { StyleSheet } from 'react-native';

const ShopModal = () => {
  const navigation = useNavigation<ShopStackNavigationProp>();
  const handleGoBack = () => navigation.goBack();
  const handleNavigateToShop = () => navigation.navigate(Screens.UPGRADE_TO_PRO_MODAL);
  const handleNavigateToFreebie = () => navigation.navigate(Screens.GET_FREEBIE_MODAL); // TODO this screen doesnt exist yet
  return (
    <Container style={styles.container}>
      <BackButton onPress={handleGoBack} />
      <Content onNavigateToUpgrade={handleNavigateToShop} onNavigateToFreebie={handleNavigateToFreebie} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
});
export default ShopModal;
