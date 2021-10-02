import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HtmlParser, Icon, AppText } from '../../../common';
import React, { FC } from 'react';
import { Card } from '../../../redux/decks/reducer';
import { theme } from '../../../utils';
import IconButton from '../../../common/IconButton';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  onTrashPress: (event: GestureResponderEvent) => void;
  card: Pick<Card, 'question' | 'answer'>;
  isOwner: boolean;
}

const CardItem: FC<Props> = ({ onPress, onTrashPress, card, isOwner }) => (
  <View style={styles.container}>
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
    <TouchableOpacity onPress={onPress} style={styles.content}>
      <View style={styles.innerContent}>
        <View style={styles.top}>
          <AppText size="p" textStyle={styles.label}>
            Question:
          </AppText>
          <View style={styles.htmlContainer}>
            <HtmlParser withImgContainer text={`${card.question}`} />
          </View>
        </View>
        {!card.answer?.length && (
          <View style={styles.bottom}>
            <Icon
              name="question"
              bgColor={theme.colors.warning}
              imgStyle={styles.iconImg}
              style={styles.icon}
            />
            <AppText size="p" textStyle={styles.textStyle}>
              Missing answer
            </AppText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: 150,
    flex: 1,
  },
  top: {
    flex: 1,
    overflow: 'hidden',
  },
  innerContent: {
    flex: 1,
  },
  textStyle: {
    color: '#646464',
  },
  bottom: {
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  htmlContainer: {
    marginVertical: 8,
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
