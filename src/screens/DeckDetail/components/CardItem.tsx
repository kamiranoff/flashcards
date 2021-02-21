import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../../../common/CustomText';
import { HtmlParser, Icon } from '../../../common';
import React, { FC } from 'react';
import { Card } from '../../../redux/reducer';
import { getPlatformDimension, isSmallDevice } from '../../../utils/device';
import { theme } from '../../../utils';
import IconButton from '../../../common/IconButton';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  onTrashPress: (event: GestureResponderEvent) => void;
  card: Pick<Card, 'question' | 'answer'>;
}

const CardItem: FC<Props> = ({ onPress, onTrashPress, card }) => (
  <View style={styles.content}>
    <View style={styles.trashIconContainer}>
      <IconButton
        onPress={onTrashPress}
        iconName="trash"
        imgStyle={styles.transparentIconImg}
        style={styles.trashIcon}
        hasShadow={false}
      />
    </View>
    <TouchableOpacity onPress={onPress}>
      <View>
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
              Missing answer
            </CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  content: {
    width: isSmallDevice() ? 130 : getPlatformDimension(150, 150, 150),
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
    zIndex: 3,
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
  trashIconContainer: {
    zIndex: 2,
    position: 'absolute',
    flexDirection: 'row',
    top: -3,
    right: -8,
    alignSelf: 'flex-end',
  },
  transparentIconImg: {
    width: 18,
    height: 18,
  },
  trashIcon: {
    borderWidth: 0.5,
    borderColor: '#222',
    width: 30,
    height: 30,
  },
});

export default CardItem;
