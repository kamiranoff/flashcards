import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { Container } from '../../common';
import Carousel from './Carousel';
import CustomText from '../../common/CustomText';
import { selectDeckItem } from '../../redux/seclectors';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const Playground: FC<Props> = ({ route: { params } }) => {
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  return (
    <Container>
      <CustomText size="h1" centered>
        {deckDetail.title}
      </CustomText>
      <Carousel deckDetail={deckDetail} deckId={params.deckId} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 40,
  },
});

export default Playground;
