import React, { FC, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { PriceButton } from '../../../common';
import AppText from '../../../common/AppText';
import assets from '../../../assets';
import { openLink, theme } from '../../../utils';
import Item from './Item';
import { usePayments } from '../../../modules/usePayments';
import { isEmpty } from 'ramda';
import { TERMS } from '../../../config';
import { data } from './data';
import { getPlatformDimension } from '../../../utils/device';
import { AnimatedReaction } from '../../../common/AnimatedReaction';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Emoji } from '../../../common/AnimatedReaction/Emoji';

interface Props {
  onNavigateToShop?: () => void;
}

const Content: FC<Props> = ({ onNavigateToShop }) => {
  const shop = useSelector((state: RootState) => state.shop);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);

  const onSuccess = () => setStartSuccessAnimation(true);

  const { productsObject, isLoadingProducts, onBuyPack } = usePayments(onSuccess);
  const isProductObj = !isEmpty(productsObject) && !isLoadingProducts;
  const monthlySubsText = isProductObj
    ? `${productsObject.monthly_subscription.localizedPrice} / month`
    : 'N/A';
  const yearlySubsText = isProductObj ? `${productsObject.yearly_subscription.localizedPrice} / year` : 'N/A';

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={assets.icons.flashMaster} style={styles.image} />
            <View style={styles.inner}>
              <AppText size="h1">BECOME A</AppText>
              <AppText size="h1">FLASHMASTER</AppText>
            </View>
          </View>
          <View style={styles.textContent}>
            {data.map((item, index) => (
              <Item key={index} icon={item.icon} label={item.label} text={item.text} />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <PriceButton
              primaryText={`Then ${monthlySubsText}`}
              onPress={() => isProductObj && onBuyPack(productsObject.monthly_subscription)}
              style={{ backgroundColor: theme.colors.icon }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PriceButton
              primaryText={`Then ${yearlySubsText}`}
              onPress={() => isProductObj && onBuyPack(productsObject.yearly_subscription)}
            />
            <View style={styles.arrowContainer}>
              <Image source={assets.icons.arrow} style={styles.arrowImg} resizeMode="contain" />
              <AppText size="h3">50% off</AppText>
            </View>
          </View>
          {shop.yearlySubscription ? (
            <View style={styles.subscriberContainer}>
              <AppText size="h3" centered>
                You are our subscriber
              </AppText>
              <Emoji name="heart" style={styles.emoji} />
            </View>
          ) : null}
          {onNavigateToShop ? (
            <PriceButton
              isSecondaryText={false}
              primaryText="More"
              onPress={onNavigateToShop}
              style={styles.shopButton}
            />
          ) : null}
        </View>
        <View style={styles.info}>
          <AppText size="p">{TERMS}</AppText>
          <View style={styles.innerInfo}>
            <AppText size="p" underlined onPress={() => openLink('https://myflashcards.app/terms.html')}>
              Terms of Service
            </AppText>
            <AppText size="p" underlined onPress={() => openLink('https://myflashcards.app/privacy.html')}>
              Privacy Policy
            </AppText>
          </View>
        </View>
        <AnimatedReaction
          startAnimation={startSuccessAnimation}
          onAnimationFinish={() => setStartSuccessAnimation(false)}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 80,
  },
  content: {
    backgroundColor: '#fff',
    marginTop: getPlatformDimension(-39, -60),
  },
  inner: {
    marginTop: 30,
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
    marginVertical: 50,
  },
  innerInfo: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  shopButton: {
    backgroundColor: theme.colors.icon,
    width: 150,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 15,
  },
  subscriberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  emoji: {
    fontSize: 24,
  },
});

export default Content;
