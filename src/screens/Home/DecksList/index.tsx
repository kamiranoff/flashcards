import React, { FC, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as R from 'ramda';
import DeckItem from './DeckItem';
import { Screens } from '../../../navigation/types';
import { SPACING } from '../../../utils/device';
import useDecks from '../../../hooks/useDecks';
import { theme } from '../../../utils';
import NoContentInfo from '../../../common/NoContentInfo';
import { useKeyboard } from '../../../hooks/useKeyboard';

// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;

const DecksList: FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });
  const { navigate } = useNavigation();
  const { decks, decksIds, handleRemoveDeck } = useDecks();
  const { keyboardHeight } = useKeyboard();

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const { title, cards, sharedWithYou } = decks[item];
    const goodAnswers = cards.filter((c) => c.rank !== null && c.rank > 0).length;

    const handleNavigate = () =>
      title ? navigate(Screens.DECK_DETAIL, { id: item, color: colors[index % colors.length] }) : null;

    return (
      <DeckItem
        item={item}
        index={index}
        title={title}
        scrollY={scrollY}
        onDelete={handleRemoveDeck(item)}
        onNavigate={handleNavigate}
        totalCards={cards.length}
        goodAnswers={goodAnswers}
        sharedWithYou={sharedWithYou}
      />
    );
  };

  return (
    <>
      {R.isEmpty(decks) ? (
        <NoContentInfo text="flashcard" style={styles.noContentInfo} />
      ) : (
        <Animated.FlatList
          contentContainerStyle={[styles.flatListContainer, { paddingBottom: keyboardHeight }]}
          scrollEventThrottle={16}
          data={decksIds}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          keyboardShouldPersistTaps="always"
          {...{ onScroll }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: SPACING,
    marginTop: 5,
  },
  noContentInfo: {
    flex: 1,
    marginTop: -50,
  },
});

export default DecksList;
