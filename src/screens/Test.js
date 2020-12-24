import * as React from 'react';
import { StatusBar, Text, View, StyleSheet, Dimensions, Animated, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.85 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const Test = ({ deckDetail }) => {
  const data = [{ id: 'empty-left' }, ...deckDetail.cards, { id: 'empty-right' }];
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (item.id === 'empty-left' || item.id === 'empty-right') {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [80, 10, 80],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  width: ITEM_SIZE,
                  // height: ITEM_SIZE,
                  marginHorizontal: 8,
                  padding: 8,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: 'white',
                }}>
                <View style={styles.posterImage}>
                  <Text>HEllo</Text>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.6,
    borderRadius: 4,
    backgroundColor: 'red',
    margin: 0,
    marginBottom: 10,
  },
});

export default Test;
