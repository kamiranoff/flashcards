import React, { FC } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import { AppText, HtmlParser, IconButton } from '../../common';
import { isLargeDevice, WINDOW_WIDTH } from '../../utils/device';

type Props = {
  title: string;
  text: string;
  onPress: () => void;
  onEdit: () => void;
  interpolation: Animated.AnimatedInterpolation;
};
const ITEM_SIZE = isLargeDevice() ? WINDOW_WIDTH : WINDOW_WIDTH * 0.9;

const CardContent: FC<Props> = ({ text, onPress, interpolation, title, onEdit }) => (
  <Animated.View style={[styles.container, { transform: [{ rotateY: interpolation }] }]}>
    <View style={styles.editButton}>
      <IconButton onPress={onEdit} iconName="edit" />
    </View>
    <ScrollView
      style={styles.scrollView}
      nestedScrollEnabled
      scrollEnabled
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.innerContainer}>
        <AppText size="h1" centered>
          {title}
        </AppText>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.content}>
            <HtmlParser text={text} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: ITEM_SIZE * 1.4,
    backgroundColor: '#f5f4ee',
    backfaceVisibility: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#222',
    // borderWidth: 0.5,
    paddingVertical: 10,
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    height: ITEM_SIZE * 1.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1.65,

    elevation: 3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f4ee',
    paddingHorizontal: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f5f4ee',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#f5f4ee',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: ITEM_SIZE - 20 * 2,
  },
  editButton: {
    position: 'absolute',
    top: 2,
    right: 5,
    zIndex: 999,
  },
});

export { CardContent };
