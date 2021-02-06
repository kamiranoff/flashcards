import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, PriceButton } from '../../../common';
import CustomText from '../../../common/CustomText';
import assets from '../../../assets';
import { theme } from '../../../utils';
import Item from './Item';

// FIXME: typescript issue
const data = [
  {
    icon: 'decks',
    label: 'Unlock unlimited decks',
    text: 'Create & study unlimited decks',
  },
  {
    icon: 'cardsWithPen',
    label: 'Unlock unlimited cards',
    text: 'Create cards with no limits',
  },
  {
    icon: 'toolbar',
    label: 'Unlock all rich toolbar features',
    text: 'Italic, bold, images and many more...',
  },
  {
    icon: 'noAds',
    label: 'No more ads!',
    text: 'No more distractions by ads',
  },
];

const UpgradeToPro: FC = () => (
  <Container style={styles.container}>
    <View style={styles.content}>
      <View style={styles.header}>
        <Image source={assets.icons.flashMaster} style={styles.image} />
        <View style={{ marginTop: 30 }}>
          <CustomText size="h1">BECOME A</CustomText>
          <CustomText size="h1">FLASHMASTER</CustomText>
        </View>
      </View>
      <View style={styles.textContent}>
        {data.map((item, index) => (
          <Item key={index} icon={item.icon} label={item.label} text={item.text} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <PriceButton
          primaryText="£0.99 / month"
          onPress={() => null}
          buttonStyle={{ backgroundColor: theme.colors.icon }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PriceButton primaryText="£5.99 / year" onPress={() => null} />
        <View style={styles.arrowContainer}>
          <Image source={assets.icons.arrow} style={styles.arrowImg} resizeMode="contain" />
          <CustomText size="h3">50% off</CustomText>
        </View>
      </View>
    </View>
    <View style={styles.info}>
      <View style={styles.innerInfo}>
        <CustomText size="p" underlined onPress={() => console.log('ADD LINK')}>
          Terms of Service
        </CustomText>
        <CustomText size="p" underlined onPress={() => console.log('ADD LInk')}>
          Privacy Policy
        </CustomText>
      </View>
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: '#fff',
  },
  image: {
    aspectRatio: 0.8,
    resizeMode: 'contain',
    width: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textContent: {
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: 150,
    alignSelf: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: -70,
  },
  arrowImg: {
    width: 40,
    height: 30,
  },
  info: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default UpgradeToPro;
