import React, { FC, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  GestureResponderEvent,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SPACING } from '../../../utils/device';
import { SharedElement } from 'react-navigation-shared-element';
import IconButton from '../../../common/IconButton';
import { saveDeck } from '../../../redux/actions';
import assets from '../../../assets';
import { theme } from '../../../utils';

// const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];
// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;

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
  const inputRef = useRef<TextInput>(null);
  const handleSaveDeck = () => (newTitle ? dispatch(saveDeck(item, newTitle)) : null);
  const handleEdit = () => inputRef && inputRef.current && inputRef.current.focus();

  return (
    <TouchableOpacity onPress={onNavigate} style={styles.wrapper}>
      <View style={styles.container}>
        <SharedElement id={`item.${item}`} style={[StyleSheet.absoluteFillObject]}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: colors[index % colors.length], borderRadius: 4 },
            ]}
          />
        </SharedElement>
        <View style={styles.button}>
          <IconButton
            onPress={onPress}
            iconName="trash"
            imgStyle={styles.transparentIconImg}
            style={{ ...transparentIcon, marginRight: 10 }}
          />
          <IconButton
            onPress={handleEdit}
            iconName="edit"
            imgStyle={styles.transparentIconImg}
            style={styles.transparentIcon}
          />
        </View>
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
      </View>
    </TouchableOpacity>
  );
};

const transparentIcon = {
  backgroundColor: 'transparent',
  borderWidth: 0.5,
  borderColor: '#222',
  width: 30,
  height: 30,
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING,
    height: ITEM_HEIGHT,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  container: {
    flex: 1,
    padding: SPACING,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: 'black',
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    position: 'absolute',
    flexDirection: 'row',
    top: 5,
    right: 10,
    alignSelf: 'flex-end',
  },
  stroke: {
    width: '100%',
    height: 5,
    marginTop: -5,
    resizeMode: 'contain',
  },
  transparentIcon: {
    ...transparentIcon,
  },
  transparentIconImg: {
    width: 18,
    height: 18,
  },
});

export default DeckItem;
