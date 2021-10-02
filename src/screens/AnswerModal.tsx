import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddAnswerScreenNavigationProp, AddAnswerScreenRouteProp } from '../navigation/types';
import { selectCard, selectDeckItem } from '../redux/seclectors';
import { Card } from '../redux/decks/reducer';
import { saveAnswer, saveNewCard } from '../redux/decks/actions';
import { CloseButton, Form, Title } from '../common';
import { StyleSheet, View } from 'react-native';
import { theme } from '../utils';

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
    if (deckDetail.shareId) {
      dispatch(saveNewCard(deckId, cardId, true));
    }
    navigation.popToTop();
  };

  const handleCloseModal = () => navigation.popToTop();

  return (
    <View style={styles.container}>
      <Title title={title} />
      <CloseButton onPress={handleCloseModal} />
      <Form
        placeholder="Type an answer"
        initialValue={card?.answer || ''}
        onSubmit={(answer) => handleSave(answer)}
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
export default AnswerModal;
