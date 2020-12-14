import React, { FC, useState } from 'react';
import { View, StyleSheet, TextInput, Button, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { saveDeck } from '../redux/actions';
import { ITEM_HEIGHT, SPACING } from '../../../styles/utils';
import { SharedElement } from 'react-navigation-shared-element';

const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];

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
    <TouchableOpacity onPress={onNavigate} style={{ marginBottom: SPACING, height: ITEM_HEIGHT }}>
      <View style={styles.container}>
        <SharedElement id={`item.${item}`} style={[StyleSheet.absoluteFillObject]}>
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors[index % colors.length], borderRadius: 16 }]} />
        </SharedElement>
        <TextInput
          onEndEditing={handleSaveDeck}
          blurOnSubmit
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="New Deck Name"
        />
        <Button title="Remove" onPress={onPress} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default DeckItem;
