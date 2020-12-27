import React, { FC, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIOS, WINDOW_WIDTH } from '../styles/utils';
import { Card } from '../modules/DecksList/redux/reducer';
import CustomText from './CustomText';
import { Screens } from '../navigation/interface';

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.85 : WINDOW_WIDTH * 0.74;

interface Props {
  card: Card;
  title: string;
  deckId: string;
}

const CardItem: FC<Props> = ({ card, title, deckId }) => {
  const navigation = useNavigation();
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
  return (
    <View style={styles.innerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(Screens.QUESTION_MODAL, { title, deckId, cardId: card.id })}>
        <View style={{ zIndex: 9999, height: 30 }}>
          <CustomText size="h2">Edit</CustomText>
        </View>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={{ flex: 1 }}>

          <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
            <CustomText size="h1">{card.question}</CustomText>
          </Animated.View>
          <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
            <CustomText size="h1">{card.answer}</CustomText>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: ITEM_SIZE * 1.6 - 30,
    backgroundColor: 'gray',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 0,
  },
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.6,
    borderRadius: 4,
    backgroundColor: '#94c7b6',
    margin: 0,
    marginBottom: 10,
  },
});

export default CardItem;
