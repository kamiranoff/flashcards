import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as R from 'ramda';
import { SharedElement } from 'react-navigation-shared-element';
import DeckItem from './DeckItem';
import { PlusButton } from '../../../common';
import { Screens } from '../../../navigation/interface';
import { getPlatformDimension, moderateScale, SPACING, WINDOW_HEIGHT } from '../../../styles/utils';
import useDecks from '../../../hooks/useDecks';

const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];

const DecksList: FC = () => {
  const { decks, decksIds, handleAddDeck, handleRemoveDeck } = useDecks();
  const { navigate } = useNavigation();

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const title = R.prop('title', decks[item]);

    const handleNavigate = () =>
      title ? navigate(Screens.DECK_DETAIL, { id: item, color: colors[index % colors.length] }) : null;
    return <DeckItem item={item} index={index} title={title} onPress={handleRemoveDeck(item)} onNavigate={handleNavigate} />;
  };

  return (
    <>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={decksIds}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <View style={styles.buttonContainer}>
        <PlusButton onPress={handleAddDeck} />
      </View>
      <SharedElement id="general.bg" style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT }] }]}>
        <View style={[StyleSheet.absoluteFillObject, styles.dummy]} />
      </SharedElement>
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
