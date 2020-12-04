import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  GestureResponderEvent,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { saveDeck } from '../redux/actions';

interface Props {
  item: string;
  title: string | undefined;
  onPress: (event: GestureResponderEvent) => void;
}

const DeckItem: FC<Props> = ({ item, title, onPress }) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);

  const handleSaveDeck = () =>
    newTitle ? dispatch(saveDeck(item, newTitle)) : null;

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default DeckItem;
