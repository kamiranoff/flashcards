import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CloseButton, Container } from '../../common';
import Content from '../Drawer/UpgradeToPro/Content';
import { Screens, ShopStackNavigationProp } from '../../navigation/types';

const UpgradeToProModal = () => {
  const navigation = useNavigation<ShopStackNavigationProp>();
  const handleCloseModal = () => navigation.goBack();
  const handleNavigateToShop = () => navigation.push(Screens.SHOP_MODAL);
  return (
    <Container>
      <CloseButton onPress={handleCloseModal} />
      <Content onNavigateToShop={handleNavigateToShop} />
    </Container>
  );
};

export default UpgradeToProModal;
