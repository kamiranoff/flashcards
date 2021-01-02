import React, { FC, ReactNode } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { isIOS, WINDOW_WIDTH } from '../../styles/utils';
import { Card } from '../../redux/reducer';
import useSwiper, { Direction } from '../../hooks/useSwiper';
import ActionButtons from './ActionButtons';

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.9 : WINDOW_WIDTH * 0.8;

interface Props {
  cards: Card[];
  deckId: string;
  onSwipeRight: (item: Card) => void;
  onSwipeLeft: (item: Card) => void;
  renderNoMoreCards: () => ReactNode;
  renderCard: (item: Card) => ReactNode;
}

const Swiper: FC<Props> = ({ cards, deckId, onSwipeRight, onSwipeLeft, renderNoMoreCards, renderCard }) => {
  const [panResponder, position, index, forceSwipe] = useSwiper(cards, deckId, onSwipeRight, onSwipeLeft);
  const handleSwipeRight = () => forceSwipe(Direction.RIGHT, index);
  const handleSwipeLeft = () => forceSwipe(Direction.LEFT, index);

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-ITEM_SIZE, 0, ITEM_SIZE],
      outputRange: ['-60deg', '0deg', '60deg'],
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
          // First card in the stack
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
          <Animated.View
            key={item.id}
            style={[
              styles.cardContainer,
              { left: i - index, right: i + index, width: ITEM_SIZE - (i - index + i + index), top: 5 * (i - index), zIndex: 1 },
            ]}>
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return (
    <View style={styles.container}>
      {renderCards()}
      {index < cards.length ? <ActionButtons onPressLeft={handleSwipeLeft} onPressRight={handleSwipeRight} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    position: 'absolute',
    width: ITEM_SIZE,
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    zIndex: 99,
  },
});

export default Swiper;
