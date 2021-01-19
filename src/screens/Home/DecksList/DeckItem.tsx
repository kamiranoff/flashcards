import React, { FC, useState } from 'react';
import { View, StyleSheet, TextInput, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { SPACING } from '../../../styles/utils';
import { SharedElement } from 'react-navigation-shared-element';
import IconButton from '../../../common/IconButton';
import { saveDeck } from '../../../redux/actions';

const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];
const ITEM_HEIGHT = 120;

interface Props {
  item: string;
  index: number;
  title: string | undefined;
  onPress: (event: GestureResponderEvent) => void;
  onNavigate: (event: GestureResponderEvent) => void;
}

const DeckItem: FC<Props> = ({ item, index, title, onPress, onNavigate }) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const handleSaveDeck = () => (newTitle ? dispatch(saveDeck(item, newTitle)) : null);

  return (
    <TouchableOpacity onPress={onNavigate} style={styles.wrapper}>
      <View style={styles.container}>
        <SharedElement id={`item.${item}`} style={[StyleSheet.absoluteFillObject]}>
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors[index % colors.length], borderRadius: 4 }]} />
        </SharedElement>
        <TextInput
          onEndEditing={handleSaveDeck}
          blurOnSubmit
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="New Deck Name"
          autoFocus={!newTitle}
        />
        <View style={styles.button}>
          <IconButton onPress={onPress} iconName="remove" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING,
    height: ITEM_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: SPACING,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderRadius: 0,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
});

export default DeckItem;
