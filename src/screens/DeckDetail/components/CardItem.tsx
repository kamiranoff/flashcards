import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../../../common/CustomText';
import { HtmlParser, Icon } from '../../../common';
import React, { FC } from 'react';
import { Card } from '../../../redux/reducer';
import { getPlatformDimension, isSmallDevice } from '../../../utils/device';
import { theme } from '../../../utils';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  card: Pick<Card, 'question' | 'answer'>;
}

const CardItem: FC<Props> = ({ onPress, onLongPress, card }) => (
  <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
    <View style={styles.content}>
      <View style={styles.top}>
        <CustomText size="p" textStyle={styles.label}>
          Question:
        </CustomText>
        <View style={{ marginVertical: 8 }}>
          <HtmlParser isSliced text={`${card.question}`} />
        </View>
      </View>
      {card.answer.length ? (
        <View style={styles.emptyView} />
      ) : (
        <View style={styles.bottom}>
          <Icon
            name="question"
            bgColor={theme.colors.warning}
            imgStyle={styles.iconImg}
            style={styles.icon}
          />
          <CustomText size="p" textStyle={{ color: '#646464' }}>
            missing answer
          </CustomText>
        </View>
      )}
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
  top: {
    justifyContent: 'center',
  },
  bottom: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  iconImg: {
    width: 12,
  },
  label: {
    color: theme.colors.p,
  },
  emptyView: {
    height: 30,
  },
});

export default CardItem;
