import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { CloseButton, Container, Form, Title } from 'common';
import { selectCard, selectDeckItem } from '../redux/seclectors';
import { Card } from '../redux/reducer';
import { saveAnswer } from '../redux/actions';
import Api from '../api';

type AddAnswerScreenRouteProp = RouteProp<RootStackParamList, Screens.ANSWER_MODAL>;
type AddAnswerScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ANSWER_MODAL>;

export interface Props {
  route: AddAnswerScreenRouteProp;
  navigation: AddAnswerScreenNavigationProp;
}

const AnswerModal: FC<Props> = ({ route: { params }, navigation }) => {
  const { title, deckId, cardId } = params;
  const card = useSelector(selectCard(deckId, cardId));
  const deckDetail = useSelector(selectDeckItem(deckId));
  const dispatch = useDispatch();

  const handleSave = async (answer: Card['answer']) => {
    dispatch(saveAnswer(deckId, cardId, answer));
    if (deckDetail.sharedByYou) {
      await Api.editDeckByShareId(deckDetail, deckDetail.shareId);
    }
    navigation.popToTop();
  };

  const handleCloseModal = () => navigation.popToTop();

  return (
    <Container>
      <Title title={title} />
      <CloseButton onPress={handleCloseModal} />
      <Form
        placeholder="Type an answer"
        initialValue={card?.answer || ''}
        onSubmit={(answer) => handleSave(answer)}
      />
    </Container>
  );
};

export default AnswerModal;
