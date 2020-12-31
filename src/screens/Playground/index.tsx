import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { CloseButton, Container } from '../../common';
import Carousel from './Carousel';
import CustomText from '../../common/CustomText';
import { selectDeckItem } from '../../redux/seclectors';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const Playground: FC<Props> = ({ route: { params }, navigation: { goBack } }) => {
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  return (
    <Container>
      <CloseButton onPress={goBack} />
      <CustomText size="h1" centered>
        {deckDetail.title}
      </CustomText>
      <Carousel deckDetail={deckDetail} deckId={params.deckId} cardId={params.cardId} />
    </Container>
  );
};

export default Playground;
