import React, { FC, useRef, useCallback, useState, useEffect } from 'react';
import { Animated, View, Text, FlatList, TouchableHighlight, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootStackParamList, Screens } from '../navigation/interface';
import { selectDeckItem } from '../modules/DecksList/redux/seclectors';
import { Card } from '../modules/DecksList/redux/reducer';
import { SPACING, WINDOW_WIDTH } from '../styles/utils';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const OVERFLOW_HEIGHT = 70;
const ITEM_WIDTH = WINDOW_WIDTH * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const Playground: FC<Props> = ({ route: { params }, navigation }) => {
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const setIndex = useCallback(
    (i) => {
      scrollXIndex.setValue(i);
      setActiveIndex(i);
    },
    [scrollXIndex],
  );

  useEffect(() => {
    console.log('useEffect', scrollXAnimated);
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  const renderItem = (props: any) => {
    console.log('props', props.index);
    const inputRange = [props.index - 1, props.index, props.index + 1];
    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [50, 0, -100],
    });
    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3],
    });
    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
    });
    console.log('opacity', opacity)
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: params.deckId, cardId: props.item.id })
        }>
        <Animated.View
          style={{
            position: 'absolute',
            left: -ITEM_WIDTH / 2,
            opacity,
            transform: [
              {
                translateX,
              },
              { scale },
            ],
          }}>
          <Animated.View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, backgroundColor: 'green', opacity }}>
            <Animated.Text style={{ opacity }}>Question: {props.item.question}</Animated.Text>
            <Animated.Text style={{ opacity }}>Answer: {props.item.answer}</Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableHighlight>
    );
  };

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (activeIndex === deckDetail.cards.length - 1) {
            return;
          }
          setIndex(activeIndex + 1);
        }
      }}>
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (activeIndex === 0) {
              return;
            }
            setIndex(activeIndex - 1);
          }
        }}>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <Text style={styles.text}>Playground</Text>
          <FlatList
            data={deckDetail.cards}
            removeClippedSubviews={false}
            horizontal
            scrollEnabled={false}
            renderItem={(props) => renderItem(props)}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
            }}
            CellRendererComponent={({ item, index, children, style, ...props }) => {
              return (
                <View style={[style, { zIndex: deckDetail.cards.length - 1 }]} index={index} {...props}>
                  {children}
                </View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
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
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Playground;
