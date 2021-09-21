import React, { FC, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { AppText, HtmlParser } from '../../common';
import { isLargeDevice, WINDOW_WIDTH } from '../../utils/device';

type Props = {
  question: string;
  onPress: () => void;
  interpolation: Animated.AnimatedInterpolation;
};
const ITEM_SIZE = isLargeDevice() ? WINDOW_WIDTH : WINDOW_WIDTH * 0.9;

const Question: FC<Props> = ({ question, onPress, interpolation }) => {
  return (
    <Animated.View style={[styles.card, { transform: [{ rotateY: interpolation }] }]}>
      <ScrollView
        nestedScrollEnabled
        scrollEnabled
        pointerEvents="box-only"
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'blue' }}>
        <TouchableOpacity onPress={onPress} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <View style={{ flex: 1 }}>
            <AppText size="h1" centered>
              Question
            </AppText>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
              <HtmlParser text={question} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});

export { Question };
