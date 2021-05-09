import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import { customAlphabet } from 'nanoid';
import { AddQuestionScreenNavigationProp, AddQuestionScreenRouteProp, Screens } from '../navigation/types';
import { CloseButton, Container, Form, Title } from 'common';
import { selectCard, selectDeckItem } from '../redux/seclectors';
import { Card } from '../redux/decks/reducer';
import { saveNewCard, saveQuestion } from '../redux/decks/actions';

export interface Props {
  route: AddQuestionScreenRouteProp;
  navigation: AddQuestionScreenNavigationProp;
}

const QuestionModal: FC<Props> = ({ route: { params }, navigation: { navigate, goBack } }) => {
  const { title, deckId, cardId } = params;
  const card = useSelector(selectCard(deckId, cardId));
  const deckDetail = useSelector(selectDeckItem(deckId));
  const dispatch = useDispatch();

  const handleCloseModal = () => goBack();

  const handleSave = async (question: Card['question']) => {
    const generateId = customAlphabet('1234567890', 5);
    const frontEndId = cardId || parseInt(generateId());
    const isEdit = !!cardId;

    dispatch(saveQuestion(deckId, frontEndId, question, isEdit));

    if (deckDetail.shareId) {
      // update card in db because the deck has been shared
      dispatch(saveNewCard(deckId, frontEndId, isEdit));
    }

    return navigate(Screens.ANSWER_MODAL, { title, deckId, cardId: frontEndId });
  };

  return (
    <Container>
      <Title title={title} />
      <CloseButton onPress={handleCloseModal} />
      <Form
        placeholder="Type a question"
        initialValue={card?.question || ''}
        onSubmit={(question) => handleSave(question)}
      />
    </Container>
  );
};

export default QuestionModal;
