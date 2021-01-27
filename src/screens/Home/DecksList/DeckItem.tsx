import React, { FC, useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TextInput,
  GestureResponderEvent,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SPACING, WINDOW_HEIGHT } from '../../../utils/device';
import { SharedElement } from 'react-navigation-shared-element';
import IconButton from '../../../common/IconButton';
import { saveDeck } from '../../../redux/actions';
import assets from '../../../assets';
import { theme } from '../../../utils';

// const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];
// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;

const { width } = Dimensions.get('window');
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const MARGIN = 16;
export const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;

console.log('CARD_HEIGHT', CARD_HEIGHT);
const ITEM_HEIGHT = 120;
export const CARD_HEIGHT = ITEM_HEIGHT + SPACING * 2;
const height = WINDOW_HEIGHT - 64;

interface Props {
  item: string;
  index: number;
  scrollY: Animated.Value;
  title: string | undefined;
  onPress: (event: GestureResponderEvent) => void;
  onNavigate: (event: GestureResponderEvent) => void;
}

const DeckItem: FC<Props> = ({ item, index, scrollY, title, onPress, onNavigate }) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<TextInput>(null);
  const handleSaveDeck = () => (newTitle ? dispatch(saveDeck(item, newTitle)) : null);
  const handleEdit = () => inputRef && inputRef.current && inputRef.current.focus();
  console.log('index', index, CARD_HEIGHT, scrollY);

  const position = Animated.subtract(index * CARD_HEIGHT, scrollY);
  const isDisappearing = -CARD_HEIGHT + 60;
  const isTop = 0;
  const isBottom = WINDOW_HEIGHT - CARD_HEIGHT;
  const isAppearing = WINDOW_HEIGHT;
  console.log('WINDOW_HEIGHT', WINDOW_HEIGHT);
  const translateY = Animated.add(
    Animated.add(
      scrollY,
      scrollY.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: 'clamp',
      }),
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp',
    }),
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <TouchableOpacity onPress={onNavigate}>
      <Animated.View
        style={[styles.container, styles.wrapper, { opacity, transform: [{ translateY }, { scale }] }]}>
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
      </Animated.View>
    </TouchableOpacity>
  );
};

const transparentIcon = {
  backgroundColor: 'transparent',
  borderWidth: 0.5,
  borderColor: '#222',
  width: 30,
  height: 30,
  shadowColor: 'transparent',
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING,
    ...theme.backgroundShadow,
    // ...Platform.select({
    //   android: {
    //     elevation: 4,
    //   },
    //   default: {
    //     shadowColor: 'rgba(0,0,0, .4)',
    //     shadowOffset: { height: 1, width: 1 },
    //     shadowOpacity: 1,
    //     shadowRadius: 1,
    //   },
    // }),
  },
  container: {
    height: ITEM_HEIGHT,
    // flex: 1,
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
