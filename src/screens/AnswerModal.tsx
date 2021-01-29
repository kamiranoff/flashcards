import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { CloseButton, Container, Form, Title } from 'common';
import { selectCard } from '../redux/seclectors';
import { Card } from '../redux/reducer';
import { saveAnswer } from '../redux/actions';

type AddAnswerScreenRouteProp = RouteProp<RootStackParamList, Screens.ANSWER_MODAL>;
type AddAnswerScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ANSWER_MODAL>;

export interface Props {
  route: AddAnswerScreenRouteProp;
  navigation: AddAnswerScreenNavigationProp;
}

const AnswerModal: FC<Props> = ({ route: { params }, navigation }) => {
  const { title, deckId, cardId } = params;
  const card = useSelector(selectCard(deckId, cardId));
  const dispatch = useDispatch();

  const handleSave = (answer: Card['answer']) => {
    dispatch(saveAnswer(deckId, cardId, answer));
    navigation.popToTop();
  };

  const handleCloseModal = () => navigation.popToTop();

  return (
    <Container>
      <Title title={title} />
      <CloseButton onPress={handleCloseModal} />
      <Form
        placeholder="Answer"
        initialValue={card?.answer || ''}
        onSubmit={(answer) => handleSave(answer)}
      />
    </Container>
  );
};

export default AnswerModal;
