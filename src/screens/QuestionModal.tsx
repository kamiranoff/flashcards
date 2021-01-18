import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { CloseButton, Container, Form, Title } from 'common';
import { selectCard } from '../redux/seclectors';
import { Card } from '../redux/reducer';
import { saveQuestion } from '../redux/actions';
import CustomText from '../common/CustomText';

type AddQuestionScreenRouteProp = RouteProp<RootStackParamList, Screens.QUESTION_MODAL>;
type AddQuestionScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.QUESTION_MODAL>;

export interface Props {
  route: AddQuestionScreenRouteProp;
  navigation: AddQuestionScreenNavigationProp;
}

const QuestionModal: FC<Props> = ({ route: { params }, navigation: { navigate, goBack } }) => {
  const { title, deckId, cardId } = params;
  const card = useSelector(selectCard(deckId, cardId));
  const dispatch = useDispatch();

  const handleCloseModal = () => goBack();

  const handleSave = (question: Card['question']) => {
    const id = cardId || Date.now().toString(); // Timestamp as id
    const isEdit = !!cardId;
    dispatch(saveQuestion(deckId, id, question, isEdit));
    navigate(Screens.ANSWER_MODAL, { title, deckId, cardId: id });
  };

  return (
    <Container>
      <Title title={title} />
      <CloseButton onPress={handleCloseModal} />
      <Form placeholder="Question" initialValue={card?.question || ''} onSubmit={(question) => handleSave(question)} />
    </Container>
  );
};

export default QuestionModal;
