import React, { FC, ReactNode } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { isIOS, WINDOW_WIDTH } from '../../styles/utils';
import { Card } from '../../redux/reducer';
import useSwiper from '../../hooks/useSwiper';

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.85 : WINDOW_WIDTH * 0.74;

interface Props {
  cards: Card[];
  deckId: string;
  onSwipeRight: (item: Card) => void;
  onSwipeLeft: (item: Card) => void;
  renderNoMoreCards: () => ReactNode;
  renderCard: (item: Card) => ReactNode;
}

const Swiper: FC<Props> = ({ cards, deckId, onSwipeRight, onSwipeLeft, renderNoMoreCards, renderCard }) => {
  const [panResponder, position, index] = useSwiper(cards, deckId, onSwipeRight, onSwipeLeft);

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-WINDOW_WIDTH * 1.5, 0, WINDOW_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = (): ReactNode => {
    if (index >= cards.length) {
      return renderNoMoreCards();
    }

    return cards
      .map((item: Card, i: number) => {
        if (i < index) {
          return null;
        }

        if (i === index) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardContainer, { zIndex: 9 }]}
              {...panResponder.panHandlers}>
              {renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View key={item.id} style={[styles.cardContainer, { top: 10 * (i - index), zIndex: 1 }]}>
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    width: ITEM_SIZE,
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: 'red',
    zIndex: 99,
  },
});

export default Swiper;
