import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { saveQuestion } from '../modules/DecksList/redux/actions';
import { selectCard } from '../modules/DecksList/redux/seclectors';
import { Card } from '../modules/DecksList/redux/reducer';
import { Form } from 'common';

type AddQuestionScreenRouteProp = RouteProp<RootStackParamList, Screens.QUESTION_MODAL>;
type AddQuestionScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.QUESTION_MODAL>;

export interface Props {
  route: AddQuestionScreenRouteProp;
  navigation: AddQuestionScreenNavigationProp;
}

const QuestionModal: FC<Props> = ({ route: { params }, navigation: { navigate } }) => {
  const { title, deckId, cardId } = params;
  const card = useSelector(selectCard(deckId, cardId));
  const dispatch = useDispatch();

  const handleSave = (question: Card['question']) => {
    const id = cardId || Date.now().toString(); // Timestamp as id
    const isEdit = !!cardId;
    dispatch(saveQuestion(deckId, id, question, isEdit));
    navigate(Screens.ANSWER_MODAL, { title, deckId, cardId: id });
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Form placeholder="Question" initialValue={card?.question || ''} onSubmit={(question) => handleSave(question)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default QuestionModal;
