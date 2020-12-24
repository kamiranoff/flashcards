import React, { FC, useRef, useCallback, useState, useEffect } from 'react';
import {
  Animated,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableWithoutFeedback, ViewabilityConfig
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { selectDeckItem } from '../modules/DecksList/redux/seclectors';
import { Card } from '../modules/DecksList/redux/reducer';
import { SPACING, WINDOW_WIDTH } from '../styles/utils';
import Test from './Test';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const ITEM_WIDTH = WINDOW_WIDTH * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const SPACER_ITEM_WIDTH = (WINDOW_WIDTH - ITEM_WIDTH) / 2;
const ITEM_MARGIN = 10;
const SPACER = WINDOW_WIDTH - ((ITEM_WIDTH + ITEM_MARGIN) * 2 + ITEM_MARGIN * 2);


console.log('ITEM_WIDTH', ITEM_WIDTH);
const Playground: FC<Props> = ({ route: { params }, navigation }) => {
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  return <Test deckDetail={deckDetail} />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 40,
  },
});

export default Playground;
