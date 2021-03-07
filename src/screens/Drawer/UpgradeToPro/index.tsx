import React, { FC } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Container, PriceButton } from '../../../common';
import AppText from '../../../common/AppText';
import assets from '../../../assets';
import { theme } from '../../../utils';
import Item from './Item';
import { usePayments } from '../../../modules/usePayments';
import { isEmpty } from 'ramda';
import { DrawerStackParamList, Screens } from '../../../navigation/interface';
import { StackNavigationProp } from '@react-navigation/stack';

interface IData {
  icon: 'cardsWithPen' | 'decks' | 'noAds' | 'toolbar';
  label: string;
  text: string;
}

const data: IData[] = [
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

type UpgradeScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.UPGRADE>;
interface Props {
  navigation: UpgradeScreenNavigationProp;
}

const UpgradeToPro: FC<Props> = ({ navigation }) => {
  const onSuccess = () => console.log('success');
  const { productsObject, isLoadingProducts, onBuyPack } = usePayments(onSuccess);
  const isProductObj = !isEmpty(productsObject) && !isLoadingProducts;
  const monthlySubsText = isProductObj
    ? `${productsObject.monthly_subscription.localizedPrice} / month`
    : 'N/A';
  const yearlySubsText = isProductObj ? `${productsObject.yearly_subscription.localizedPrice} / year` : 'N/A';

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={assets.icons.flashMaster} style={styles.image} />
            <View style={{ marginTop: 30 }}>
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
              primaryText={monthlySubsText}
              onPress={() => isProductObj && onBuyPack(productsObject.monthly_subscription)}
              style={{ backgroundColor: theme.colors.icon }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PriceButton
              primaryText={yearlySubsText}
              onPress={() => isProductObj && onBuyPack(productsObject.yearly_subscription)}
            />
            <View style={styles.arrowContainer}>
              <Image source={assets.icons.arrow} style={styles.arrowImg} resizeMode="contain" />
              <AppText size="h3">50% off</AppText>
            </View>
          </View>
          <PriceButton
            isSecondaryText={false}
            primaryText="Shop"
            onPress={() => navigation.navigate(Screens.SHOP)}
            style={styles.shopButton}
          />
        </View>
        <View style={styles.info}>
          <AppText size="p">
            Payment will be charges to your iTunes Account at confirmation of purchase. Account will be
            charged for renewal within 24-hours prior to the end of the current period at your chosen
            subscription's monthly price. Subscription automatically renews unless auto-renew is turned off at
            least 24-hours before the end of the current period. Subscriptions may be managed by the user and
            auto-renewal may be turned off by going to the user's Account Settings after purchase. For more
            information, see our TERMS OF USE and PRIVACY POLICY.
          </AppText>
          <View style={styles.innerInfo}>
            <AppText size="p" underlined onPress={() => console.log('ADD LINK')}>
              Terms of Service
            </AppText>
            <AppText size="p" underlined onPress={() => console.log('ADD LInk')}>
              Privacy Policy
            </AppText>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 80,
  },
  content: {
    backgroundColor: '#fff',
    marginTop: -60,
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
});

export default UpgradeToPro;
