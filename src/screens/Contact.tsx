import React, { FC } from 'react';
import { Text, Button } from 'react-native';
import { Container } from '../common';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Screens } from '../navigation/interface';

type ContactScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.DRAWER>;

export interface Props {
  navigation: ContactScreenNavigationProp;
}

const Contact: FC<Props> = ({ navigation }) => (
  <Container>
    <Text>Contact</Text>
    <Button onPress={() => navigation.goBack()} title="Go back home" />
  </Container>
);

export default Contact;
