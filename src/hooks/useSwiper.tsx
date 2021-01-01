import { useRef, useState, useEffect } from 'react';
import { Animated, PanResponder } from 'react-native';
import { WINDOW_WIDTH } from '../styles/utils';
import { Card } from '../redux/reducer';

const SWIPE_THRESHOLD = 0.25 * WINDOW_WIDTH;
const SWIPE_OUT_DURATION = 250;

type TDirection = 'right' | 'left';

enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
}

const useSwiper = (cards: Card[], deckId: string, onSwipeRight: (item: Card) => void, onSwipeLeft: (item: Card) => void) => {
  const position = useRef<any>(new Animated.ValueXY()).current; // FIXME
  const [index, setIndex] = useState(0);

  useEffect(() => {
    position.setValue({ x: 0, y: 0 });
  }, [deckId, position]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => {
        return gestureState.dx !== 0 && gestureState.dy !== 0;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx !== 0 && gestureState.dy !== 0;
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe(Direction.RIGHT);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe(Direction.LEFT);
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const forceSwipe = (direction: TDirection) => {
    const x = direction === Direction.RIGHT ? WINDOW_WIDTH : -WINDOW_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: TDirection) => {
    const item = cards[index];

    direction === Direction.RIGHT ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setIndex((prevIndex) => prevIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  return [panResponder, position, index];
};

export default useSwiper;
