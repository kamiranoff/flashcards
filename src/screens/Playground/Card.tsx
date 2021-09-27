import React, { FC, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isLargeDevice, WINDOW_WIDTH } from '../../utils/device';
import { Card } from '../../redux/decks/reducer';
import { Screens } from '../../navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CardContent } from './CardContent';

const ITEM_SIZE = isLargeDevice() ? WINDOW_WIDTH : WINDOW_WIDTH * 0.9;

interface Props {
  card: Card;
  title: string;
  deckId: string;
  isShared: boolean;
}

const CardItem: FC<Props> = ({ card, title, deckId, isShared }) => {
  const [isQuestion, setIsQuestion] = useState(true);
  const navigation = useNavigation();
  const { sub } = useSelector((state: RootState) => state.user);
  const animatedValue = useRef(new Animated.Value(0)).current;
  let v = 0;
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  animatedValue.addListener(({ value }) => {
    v = value;
  });

  const flipCard = () => {
    setIsQuestion((prev) => !prev);
    if (v >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleEdit = () => {
    if (isShared && !sub) {
      return navigation.navigate(Screens.LOGIN_OR_SIGNUP);
    }
    return v <= 90
      ? navigation.navigate(Screens.QUESTION_MODAL, { title, deckId, cardId: card.frontendId })
      : navigation.navigate(Screens.ANSWER_MODAL, { title, deckId, cardId: card.frontendId });
  };

  return (
    <View style={styles.innerContainer}>
      <CardContent
        title={isQuestion ? 'Question' : 'Answer'}
        text={isQuestion ? card.question : card.answer}
        onPress={flipCard}
        interpolation={isQuestion ? frontInterpolate : backInterpolate}
        onEdit={handleEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.4 + 5,
    margin: 0,
  },
});

export default CardItem;
