import React, { FC, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as R from 'ramda';
import { SharedElement } from 'react-navigation-shared-element';
import DeckItem from './DeckItem';
import { Screens } from '../../../navigation/interface';
import { getPlatformDimension, isIOS, moderateScale, SPACING, WINDOW_HEIGHT } from '../../../utils/device';
import useDecks from '../../../hooks/useDecks';
import AddButton from '../../../common/AddButton';
import usePrevious from '../../../hooks/usePrevious';
import { theme } from '../../../utils';

const colors = theme.colors.list;

const DecksList: FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const { navigate, addListener } = useNavigation();
  const { decks, decksIds, handleRemoveDeck } = useDecks();
  const previousDecksIds = usePrevious(decksIds.length);

  const handleOpenModal = () => navigate(Screens.ADD_DECK);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const title = R.prop('title', decks[item]);

    const handleNavigate = () =>
      title ? navigate(Screens.DECK_DETAIL, { id: item, color: colors[index % colors.length] }) : null;

    return (
      <DeckItem
        item={item}
        index={index}
        title={title}
        onPress={handleRemoveDeck(item)}
        onNavigate={handleNavigate}
      />
    );
  };

  useEffect(() => {
    return addListener('focus', () => {
      if (previousDecksIds && decksIds.length > previousDecksIds) {
        flatListRef && flatListRef.current && flatListRef.current.scrollToEnd({ animated: true });
      }
    });
  }, [addListener, decksIds.length, previousDecksIds]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.flatListContainer}
        data={decksIds}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="always"
      />
      <View style={styles.buttonContainer}>
        <AddButton onOpenModal={handleOpenModal} />
      </View>
      {isIOS ? (
        <SharedElement
          id="general.bg"
          style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT }] }]}>
          <View style={[StyleSheet.absoluteFillObject, styles.dummy]} />
        </SharedElement>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: SPACING,
    marginTop: 5,
  },
  buttonContainer: {
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50),
    right: moderateScale(16),
  },
  dummy: {
    backgroundColor: 'white',
    transform: [{ translateY: 0 }],
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },
});

export default DecksList;
