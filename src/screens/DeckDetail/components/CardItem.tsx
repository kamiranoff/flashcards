import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../../../common/CustomText';
import { HtmlParser } from '../../../common';
import React, { FC } from 'react';
import { Card } from '../../../redux/reducer';
import { getPlatformDimension, isSmallDevice } from '../../../utils/device';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  card: Pick<Card, 'question' | 'answer'>;
}

const CardItem: FC<Props> = ({ onPress, onLongPress, card }) => (
  <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
    <View style={styles.content}>
      <View style={styles.inner}>
        <CustomText size="h3" underlined>
          Question:
        </CustomText>
        <HtmlParser isSliced text={`${card.question}...`} />
      </View>
      <View style={styles.inner}>
        <CustomText size="h3" underlined>
          Answer:
        </CustomText>
        <HtmlParser isSliced text={card.answer} />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  content: {
    width: isSmallDevice() ? 130 : getPlatformDimension(150, 150, 170),
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  inner: {
    justifyContent: 'center',
  },
});

export default CardItem;
