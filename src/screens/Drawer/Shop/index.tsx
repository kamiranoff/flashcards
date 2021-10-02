import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../../../common';
import { Screens, ShopScreenNavigationProp } from '../../../navigation/types';
import Content from './Content';

interface Props {
  navigation: ShopScreenNavigationProp;
}

const Shop: FC<Props> = ({ navigation }) => {
  const handleGoToUpgrade = () => navigation.navigate(Screens.UPGRADE, { fromShop: true});
  const handleGoToFreebie = () => navigation.navigate(Screens.GET_FREEBIE_MODAL);
  return (
    <Container style={styles.container}>
      <Content onNavigateToUpgrade={handleGoToUpgrade} onNavigateToFreebie={handleGoToFreebie} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});

export default Shop;
