import React, { FC } from 'react';
import { Text, Button } from 'react-native';
import { Container } from '../common';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerStackParamList, Screens } from '../navigation/interface';

type GetFreeDeckScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.GET_FREEBIE>;

export interface Props {
  navigation: GetFreeDeckScreenNavigationProp;
}

const GetFreebie: FC<Props> = ({ navigation }) => (
  <Container>
    <Text>Send invite to your friends & get extra free deck!</Text>
    <Button onPress={() => navigation.goBack()} title="Go back home" />
  </Container>
);

export default GetFreebie;
