import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import * as Analytics from 'appcenter-analytics';
import { StyleSheet, View } from 'react-native';
import { customAlphabet } from 'nanoid';
import { AddQuestionScreenNavigationProp, AddQuestionScreenRouteProp, Screens } from '../navigation/types';
import { selectCard, selectDeckItem, selectUser } from '../redux/seclectors';
import { Card } from '../redux/decks/reducer';
import { saveNewCard, saveQuestion } from '../redux/decks/actions';
import { CloseButton, Form, Title } from '../common';
import { analytics, theme } from '../utils';

export interface Props {
  route: AddQuestionScreenRouteProp;
  navigation: AddQuestionScreenNavigationProp;
}

const QuestionModal: FC<Props> = ({ route: { params }, navigation: { navigate, goBack } }) => {
  const { title, deckId, cardId, fromPlayground } = params;
  const card = useSelector(selectCard(deckId, cardId));
  const user = useSelector(selectUser);
  const deckDetail = useSelector(selectDeckItem(deckId));
  const dispatch = useDispatch();

  const handleCloseModal = () => goBack();

  const handleSave = async (question: Card['question']) => {
    Analytics.trackEvent(analytics.createQuestion);
    const generateId = customAlphabet('1234567890', 5);
    const frontendId = cardId || parseInt(generateId());
    const isEdit = !!cardId;

    dispatch(saveQuestion(deckId, frontendId, question, isEdit, user.sub));

    if (deckDetail.shareId) {
      // update card in db because the deck has been shared
      dispatch(saveNewCard(deckId, frontendId, isEdit));
    }

    if (fromPlayground) {
      return handleCloseModal();
    }
    return navigate(Screens.ANSWER_MODAL, { title, deckId, cardId: frontendId });
  };

  return (
    <View style={styles.container}>
      <Title title={title} />
      <CloseButton onPress={handleCloseModal} />
      <Form
        placeholder="Type a question"
        initialValue={card?.question || ''}
        onSubmit={(question) => handleSave(question)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default QuestionModal;
