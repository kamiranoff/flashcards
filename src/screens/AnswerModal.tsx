import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { Form } from 'common';
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

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Form placeholder="Answer" initialValue={card?.answer || ''} onSubmit={(answer) => handleSave(answer)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default AnswerModal;
