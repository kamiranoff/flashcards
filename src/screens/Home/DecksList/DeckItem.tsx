import React, { FC, useEffect, useState } from 'react';
import { Animated, View, StyleSheet, GestureResponderEvent, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { isIOS, SPACING } from '../../../utils/device';
import assets from '../../../assets';
import { theme } from '../../../utils';
import { Bubble, TouchableScale } from '../../../common';
import { BottomContent } from './BottomContent';
import { TopIcons } from './TopIcons';
import AppText from '../../../common/AppText';
import usePrevious from '../../../hooks/usePrevious';

// const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];
// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;
const ITEM_HEIGHT = 120;
export const CARD_HEIGHT = ITEM_HEIGHT + SPACING;

interface Props {
  id: string;
  index: number;
  scrollY: Animated.Value;
  title: string | undefined;
  totalCards: number;
  goodAnswers: number;
  onDelete: (event: GestureResponderEvent) => void;
  onNavigate: (event: GestureResponderEvent) => void;
  sharedWithYou: boolean;
  onChangeTitle: (id: string) => void;
}

const DeckItem: FC<Props> = ({
  id,
  index,
  scrollY,
  title,
  totalCards,
  goodAnswers,
  onDelete,
  onNavigate,
  sharedWithYou,
  onChangeTitle,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const previousTitle = usePrevious(title);
  useEffect(() => {
    if (title !== previousTitle) {
      setNewTitle(title);
    }
  }, [title, previousTitle]);
  const scale = scrollY.interpolate({
    inputRange: [-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 2)],
    outputRange: [1, 1, 1, 0.5],
  });

  const opacity = scrollY.interpolate({
    inputRange: [-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
    outputRange: [1, 1, 1, 0.5],
  });

  return (
    <TouchableScale onPress={onNavigate}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: colors[index % colors.length] },
          { opacity, transform: [{ scale }], borderColor: colors[index % colors.length] },
        ]}>
        <Bubble isShared={sharedWithYou} />
        <TopIcons onDelete={onDelete} onEdit={() => onChangeTitle(id)} />
        <SharedElement id={`item.${id}`}>
          <View style={styles.titleContainer}>
            <AppText size="h2" ellipsizeMode="tail" numberOfLines={1} textStyle={styles.titleStyle} centered>
              {newTitle}
            </AppText>
          </View>
        </SharedElement>
        <Image source={assets.icons.strokeBlack} resizeMode="contain" style={styles.stroke} />
        <BottomContent totalCards={totalCards} correctAnswers={goodAnswers} />
      </Animated.View>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 5,
    ...theme.iconButtonShadow,
  },
  titleContainer: {
    marginTop: isIOS ? 20 : 0,
  },
  titleStyle: {
    paddingBottom: 5,
  },
  stroke: {
    width: '100%',
    height: 5,
    marginTop: -5,
    resizeMode: 'contain',
  },
});

export default DeckItem;
