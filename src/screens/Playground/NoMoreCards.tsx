import React, { FC } from 'react';
import CustomText from '../../common/CustomText';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import animations from '../../assets/animations';
import { useSelector } from 'react-redux';
import { selectBadAnswers, selectGoodAnswers } from '../../redux/seclectors';
import assets from '../../assets';
import { getPlatformDimension, WINDOW_WIDTH } from '../../utils/device';

interface Props {
  deckId: string;
}

const NoMoreCards: FC<Props> = ({ deckId }) => {
  const badAnswers = useSelector(selectBadAnswers(deckId));
  const goodAnswers = useSelector(selectGoodAnswers(deckId));
  return (
    <View style={styles.container}>
      <ImageBackground
        source={assets.icons.bubble}
        resizeMethod="scale"
        resizeMode="cover"
        style={styles.bubbleStyle}
        imageStyle={styles.bubbleImg}>
        <View style={styles.content}>
          <CustomText size="h2" centered>
            Today:
          </CustomText>
          <View style={styles.spacer} />
          <CustomText size="h2" centered>
            You have: {goodAnswers} correct
          </CustomText>
          <CustomText size="h2" centered>
            and {badAnswers} incorrect answers!
          </CustomText>
          <View style={styles.spacer} />
          <CustomText size="h2" centered>
            Keep up the good work!
          </CustomText>
        </View>
      </ImageBackground>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.lady} style={{ width: 120, height: 120 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  bubbleStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    width: WINDOW_WIDTH,
  },
  bubbleImg: {
    bottom: getPlatformDimension(20, 20, 0, 60),
    height: '80%',
    resizeMode: 'contain',
  },
  content: {
    top: getPlatformDimension(WINDOW_WIDTH / 2 - 70, 20, 0, 60),
  },
  spacer: {
    marginTop: 10,
  },
});

export default NoMoreCards;
