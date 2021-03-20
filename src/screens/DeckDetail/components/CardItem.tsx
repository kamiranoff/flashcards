import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HtmlParser, Icon, AppText } from '../../../common';
import React, { FC } from 'react';
import { Card } from '../../../redux/decks/reducer';
import { getPlatformDimension, isSmallDevice } from '../../../utils/device';
import { theme } from '../../../utils';
import IconButton from '../../../common/IconButton';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  onTrashPress: (event: GestureResponderEvent) => void;
  card: Pick<Card, 'question' | 'answer'>;
  isOwner: boolean;
}

const CardItem: FC<Props> = ({ onPress, onTrashPress, card, isOwner }) => (
  <View style={styles.content}>
    {isOwner && (
      <View style={styles.trashIconContainer}>
        <IconButton
          onPress={onTrashPress}
          iconName="trash"
          imgStyle={styles.transparentIconImg}
          style={styles.trashIcon}
          hasShadow={false}
        />
      </View>
    )}
    <TouchableOpacity onPress={onPress}>
      <View style={styles.touchable}>
        <View style={styles.top}>
          <AppText size="p" textStyle={styles.label}>
            Question:
          </AppText>
          <View style={{ marginVertical: 8 }}>
            <HtmlParser isSliced text={`${card.question}`} />
          </View>
        </View>
        {!card.answer.length && (
          <View style={styles.bottom}>
            <Icon
              name="question"
              bgColor={theme.colors.warning}
              imgStyle={styles.iconImg}
              style={styles.icon}
            />
            <AppText size="p" textStyle={{ color: '#646464' }}>
              Missing answer
            </AppText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'space-between',
    zIndex: 3,
  },
  top: {
    justifyContent: 'center',
  },
  touchable: {
    width: getPlatformDimension(150, 170, 190),
    minHeight: isSmallDevice() ? 150 : getPlatformDimension(155, 170, 190),
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
