import React, { FC, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIOS, WINDOW_WIDTH } from '../../styles/utils';
import { Card } from '../../redux/reducer';
import { Screens } from '../../navigation/interface';
import { HtmlParser, IconButton } from '../../common';

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.9 : WINDOW_WIDTH * 0.8;

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

  const handleEdit = () =>
    v <= 90
      ? navigation.navigate(Screens.QUESTION_MODAL, { title, deckId, cardId: card.id })
      : navigation.navigate(Screens.ANSWER_MODAL, { title, deckId, cardId: card.id });

  return (
    <>
      <View style={styles.editButton}>
        <IconButton onPress={handleEdit} iconName="edit" />
      </View>
      <View style={styles.innerContainer}>
        <ScrollView nestedScrollEnabled>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View>
              <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }, { perspective: 1000 }] }]}>
                <HtmlParser text={card.question} />
              </Animated.View>
              <Animated.View
                style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }, { perspective: 1000 }] }]}>
                <HtmlParser text={card.answer} />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: ITEM_SIZE * 1.4,
    backgroundColor: 'gray',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.4,
    backgroundColor: 'white',
    margin: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  editButton: {
    position: 'absolute',
    top: 2,
    right: 5,
    zIndex: 999,
  },
});

export default CardItem;
