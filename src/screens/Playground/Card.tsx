import React, { FC, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isLargeDevice, WINDOW_WIDTH } from '../../utils/device';
import { Card } from '../../redux/decks/reducer';
import { Screens } from '../../navigation/types';
import { IconButton } from '../../common';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Question } from './Question';
import { Answer } from './Answer';

const ITEM_SIZE = isLargeDevice() ? WINDOW_WIDTH : WINDOW_WIDTH * 0.9;

interface Props {
  card: Card;
  title: string;
  deckId: string;
  isShared: boolean;
}

const CardItem: FC<Props> = ({ card, title, deckId, isShared }) => {
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
    <>
      <View style={styles.editButton}>
        <IconButton onPress={handleEdit} iconName="edit" />
      </View>
      <View style={styles.innerContainer}>
        <Question question={card.question} onPress={flipCard} interpolation={frontInterpolate} />
        <Answer answer={card.answer} onPress={flipCard} interpolation={backInterpolate} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.4 + 5,
    backgroundColor: 'transparent',
    margin: 0,
  },
  editButton: {
    position: 'absolute',
    top: 2,
    right: 5,
    zIndex: 999,
  },
});

export default CardItem;
