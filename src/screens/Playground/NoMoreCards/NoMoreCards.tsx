import React, { FC, useCallback } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { AppText } from '../../../common';
import { selectBadAnswers, selectGoodAnswers } from '../../../redux/seclectors';
import assets from '../../../assets';
import { getPlatformDimension, WINDOW_WIDTH } from '../../../utils/device';
import { AnimatedReaction } from '../../../common/AnimatedReaction';
import { Shapes } from '../../../common/AnimatedReaction/Shape';
import animations from '../../../assets/animations';
import { quotes } from './quotes';

interface Props {
  deckId: string;
}

type Info = {
  primary: string;
  secondary: string;
  icon: keyof typeof animations;
  score: string;
};

const getRandom = (items: { quote: string; author: string }[]) =>
  items[Math.floor(Math.random() * items.length)];

const NoMoreCards: FC<Props> = ({ deckId }) => {
  const badAnswers = useSelector(selectBadAnswers(deckId));
  const goodAnswers = useSelector(selectGoodAnswers(deckId));

  const getLadyScoreInfo = useCallback((correct: number, incorrect: number): Info => {
    const total = correct + incorrect;
    const score = Math.round(total ? (correct / total) * 100 : 0);
    const info = {
      primary: '',
      secondary: '',
      icon: animations.mehLady,
      score: `${score}%`,
    };
    const quote = getRandom(quotes);
    if (score < 50) {
      info.secondary = quote.author;
      info.primary = quote.quote;
      info.icon = animations.sadLady;
    } else if (score < 69) {
      info.secondary = quote.author;
      info.primary = quote.quote;
      info.icon = animations.mehLady;
    } else if (score <= 85) {
      info.secondary = quote.author;
      info.primary = quote.quote;
      info.icon = animations.mehLady;
    } else if (score > 85) {
      info.secondary = quote.author;
      info.primary = quote.quote;
      info.icon = animations.happyLady;
    }
    return info;
  }, []);

  const scoreInfo = getLadyScoreInfo(goodAnswers, badAnswers);
  const icon = scoreInfo.icon;
  const is100 = scoreInfo.score === '100%';
  return (
    <View style={styles.container}>
      <ImageBackground
        source={assets.icons.bubble}
        resizeMethod="scale"
        resizeMode="cover"
        style={styles.bubbleStyle}
        imageStyle={styles.bubbleImg}>
        <View style={styles.content}>
          <AppText size="h2" centered>
            Your score is:
          </AppText>
          <View style={styles.spacer} />
          <AppText size="header" centered textStyle={styles.scoreText}>
            {scoreInfo.score}
          </AppText>
          <View style={styles.spacer} />
          <AppText size="h2" centered textStyle={styles.primary}>
            {`"${scoreInfo.primary}"`}
          </AppText>
          <AppText size="h2" centered textStyle={styles.secondary}>
            {scoreInfo.secondary}
          </AppText>
        </View>
      </ImageBackground>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={icon} style={styles.icon} />
      </View>
      <AnimatedReaction shapeType={Shapes.STAR} startAnimation={is100} />
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
    top: getPlatformDimension(50, 50, 100, 60),
  },
  spacer: {
    marginTop: 25,
  },
  icon: {
    width: 120,
    height: 120,
  },
  scoreText: {
    fontSize: 40,
  },
  primary: {
    paddingHorizontal: 40,
  },
  secondary: {
    marginTop: 8,
  },
});

export default React.memo(NoMoreCards);
