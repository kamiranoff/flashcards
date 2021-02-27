import React, { FC } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isEmpty } from 'ramda';
import { Container, PriceButton } from '../../common';
import assets from '../../assets';
import CustomText from '../../common/CustomText';
import { theme } from '../../utils';
import { DrawerStackParamList, Screens } from '../../navigation/interface';
import { usePayments } from '../../modules/usePayments';
import { Product } from 'react-native-iap';

interface IData {
  label: string;
  id: Product['productId'];
  price: string;
}

const data: IData[] = [
  {
    label: '1 Unlimited deck',
    id: 'one_unlimited_deck',
    price: '£0.99',
  },
  {
    label: '3 Unlimited decks',
    id: 'three_unlimited_decks',
    price: '£1.99',
  },
  {
    label: 'Remove ads',
    id: 'remove_ads',
    price: '£1.99',
  },
  {
    label: 'Get free deck',
    id: 'get_free',
    price: '£0',
  },
];

type ShopScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.SHOP>;
interface Props {
  navigation: ShopScreenNavigationProp;
}

const Shop: FC<Props> = ({ navigation }) => {
  const onSuccess = () => console.log('success');
  const { productsObject, isLoading, onBuyPack, restorePurchase } = usePayments(onSuccess);
  if (isLoading) {
    // TODO: what happens if connection to app stores fail => show message in the screen
    return <ActivityIndicator size="small" style={{ flex: 1 }} />;
  }
  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={assets.icons.happyFace} style={styles.image} />
          <View style={{ marginTop: 0, marginLeft: 10 }}>
            <CustomText size="h1">WELCOME</CustomText>
            <CustomText size="h1">TO OUR SHOP</CustomText>
          </View>
        </View>
        <CustomText size="h2" centered>
          Support us
        </CustomText>
        <CustomText size="h2" centered>
          & get full access to our features
        </CustomText>
        <View style={styles.textContent}>
          {data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => onBuyPack(productsObject[item.id])}>
              <View style={styles.itemButton}>
                <View style={{ width: '70%' }}>
                  <CustomText size="h2">{item.label}</CustomText>
                </View>
                <View style={{ marginLeft: 40 }}>
                  <CustomText size="h2">
                    {(!isEmpty(productsObject) &&
                      productsObject[item.id] &&
                      productsObject[item.id].localizedPrice) ||
                      item.price}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <PriceButton
            primaryText="UPGRADE TO PRO"
            onPress={() => navigation.navigate(Screens.UPGRADE)}
            buttonStyle={{ paddingHorizontal: 16 }}
          />
          <View style={styles.arrowContainer}>
            <Image source={assets.icons.arrow} style={styles.arrowImg} resizeMode="contain" />
            <CustomText size="h3">50% off</CustomText>
          </View>
        </View>
      </View>
      <View style={styles.info}>
        <CustomText size="p" underlined centered onPress={restorePurchase}>
          Restore Purchase
        </CustomText>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: '#fff',
    marginTop: -60,
  },
  image: {
    aspectRatio: 0.8,
    resizeMode: 'contain',
    width: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textContent: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: 200,
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
    marginTop: 40,
  },
  itemButton: {
    flexDirection: 'row',
    margin: 5,
    backgroundColor: theme.colors.icon,
    padding: 16,
    borderRadius: 8,
    width: 240,
    ...theme.buttonShadow,
  },
});

export default Shop;
