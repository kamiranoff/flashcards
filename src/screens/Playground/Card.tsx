import React, { FC, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isLargeDevice, WINDOW_WIDTH } from '../../utils/device';
import { Card } from '../../redux/decks/reducer';
import { Screens } from '../../navigation/types';
import { AppText, HtmlParser, IconButton } from '../../common';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
        <ScrollView nestedScrollEnabled scrollEnabled>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View>
              <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
                <View style={styles.label}>
                  <AppText size="h1">Question</AppText>
                </View>
                <HtmlParser text={card.question} />
              </Animated.View>
              <Animated.View
                style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
                <View style={styles.label}>
                  <AppText size="h1">Answer</AppText>
                </View>
                <View style={styles.answerContainer}>
                  <HtmlParser text={card.answer} />
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    paddingTop: 30,
    overflow: 'scroll',
  },
  card: {
    width: '100%',
    minHeight: ITEM_SIZE * 1.4,
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#222',
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  label: {
    position: 'absolute',
    top: 10,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    height: ITEM_SIZE * 1.4,
  },
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
