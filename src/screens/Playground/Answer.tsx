import React, { FC } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import { AppText, HtmlParser } from '../../common';
import { isLargeDevice, WINDOW_WIDTH } from '../../utils/device';

type Props = {
  answer: string;
  onPress: () => void;
  interpolation: Animated.AnimatedInterpolation;
};
const ITEM_SIZE = isLargeDevice() ? WINDOW_WIDTH : WINDOW_WIDTH * 0.9;

const Answer: FC<Props> = ({ answer, onPress, interpolation }) => {
  return (
    <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: interpolation }] }]}>
      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled
        scrollEnabled
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.answerContainer}>
          <AppText size="h1" centered>
            Answer
          </AppText>
          <TouchableWithoutFeedback onPress={onPress}>
            <View
              style={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: ITEM_SIZE - 20 * 2,
              }}>
              <HtmlParser text={answer} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    flex: 1,
  },
  card: {
    flex: 1,
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
  cardBack: {
    position: 'absolute',
    top: 0,
    height: ITEM_SIZE * 1.4,
  },
});

export { Answer };
