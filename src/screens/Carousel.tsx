import * as React from 'react';
import { Text, View, StyleSheet, Animated, Platform } from 'react-native';
import { isIOS, WINDOW_WIDTH } from '../styles/utils';
import { Card, Deck } from '../modules/DecksList/redux/reducer';
import FlippedCard from '../common/FlipCard';

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.85 : WINDOW_WIDTH * 0.74;
const EMPTY_ITEM_SIZE = (WINDOW_WIDTH - ITEM_SIZE) / 2;

const Carousel = ({ deckDetail }: { deckDetail: Deck }) => {
  const data: (Card | { id: string })[] = [{ id: 'empty-left' }, ...deckDetail.cards, { id: 'empty-right' }];
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data as any}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        renderItem={({ item, index }: { item: Card; index: number }) => {
          if (item.id === 'empty-left' || item.id === 'empty-right') {
            return <View style={styles.emptyItem} />;
          }
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [80, 10, 80],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View style={[styles.cardContainer, { transform: [{ translateY }] }]}>
                <FlippedCard />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyItem: {
    width: EMPTY_ITEM_SIZE,
  },
  cardContainer: {
    width: ITEM_SIZE,
    marginHorizontal: 8,
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'white',
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

export default Carousel;
