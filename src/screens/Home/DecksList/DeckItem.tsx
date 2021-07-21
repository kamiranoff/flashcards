import React, { FC, useRef, useState } from 'react';
import { Animated, View, StyleSheet, TextInput, GestureResponderEvent, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { SharedElement } from 'react-navigation-shared-element';
import { SPACING } from '../../../utils/device';
import { saveDeck } from '../../../redux/decks/actions';
import assets from '../../../assets';
import { theme } from '../../../utils';
import { Bubble, TouchableScale } from '../../../common';
import { BottomContent } from './BottomContent';
import { TopIcons } from './TopIcons';

// const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];
// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;
const ITEM_HEIGHT = 120;
export const CARD_HEIGHT = ITEM_HEIGHT + SPACING;

interface Props {
  item: string;
  index: number;
  scrollY: Animated.Value;
  title: string | undefined;
  totalCards: number;
  goodAnswers: number;
  onDelete: (event: GestureResponderEvent) => void;
  onNavigate: (event: GestureResponderEvent) => void;
  sharedWithYou: boolean;
}

const DeckItem: FC<Props> = ({
  item,
  index,
  scrollY,
  title,
  totalCards,
  goodAnswers,
  onDelete,
  onNavigate,
  sharedWithYou,
}) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<TextInput>(null);
  const handleSaveDeck = () => (newTitle ? dispatch(saveDeck(item, newTitle)) : null);
  const handleEdit = () => inputRef && inputRef.current && inputRef.current.focus();

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
      <Animated.View style={[styles.container, { opacity, transform: [{ scale }] }]}>
        <SharedElement id={`item.${item}`} style={[StyleSheet.absoluteFillObject]}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: colors[index % colors.length], borderRadius: 4 },
            ]}
          />
        </SharedElement>
        <Bubble isShared={sharedWithYou} />
        <TopIcons onDelete={onDelete} onEdit={handleEdit} />
        <TextInput
          ref={inputRef}
          onEndEditing={handleSaveDeck}
          blurOnSubmit
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="New Deck Name"
          selectionColor="#222"
        />
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
    ...theme.iconButtonShadow,
  },
  input: {
    color: '#222',
    fontWeight: 'bold',
    marginTop: 10,
    height: 40,
    borderColor: 'black',
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
  },
  stroke: {
    width: '100%',
    height: 5,
    marginTop: -5,
    resizeMode: 'contain',
  },
});

export default DeckItem;
