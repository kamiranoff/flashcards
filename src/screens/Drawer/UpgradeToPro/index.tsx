import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { BackButton, Container } from '../../../common';
import Content from './Content';
import { DrawerStackParamList, Screens, UpgradeScreenNavigationProp } from '../../../navigation/types';
import { RouteProp } from '@react-navigation/native';

interface Props {
  navigation: UpgradeScreenNavigationProp;
  route: RouteProp<DrawerStackParamList, Screens.UPGRADE>;
}
const UpgradeToPro: FC<Props> = ({ route, navigation }) => {
  return (
    <Container style={styles.container}>
      {route?.params?.fromShop ? <BackButton onPress={navigation.goBack} /> : null}
      <Content />
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

export default UpgradeToPro;
