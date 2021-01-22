import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, PrimaryButton } from '../../common';
import CustomText from '../../common/CustomText';
import rateApp from '../../modules/rateApp';
import assets from '../../assets';

const RateTheApp: FC = () => (
  <Container style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={assets.icons.review} resizeMode="contain" style={styles.image} />
    </View>
    <View style={{ flex: 1 }}>
      <CustomText centered size="h2">
        We'd love to hear from you.
      </CustomText>
      <CustomText centered size="h2">
        Your review means A LOT to us.
      </CustomText>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText="Rate & Review" onPress={() => rateApp(false)} />
      </View>
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  imageContainer: {
    flex: 1.5,
    marginLeft: 10,
    marginTop: 30,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
    height: 300,
  },
  buttonContainer: {
    marginTop: 15,
    width: 150,
    alignSelf: 'center',
  },
});

export default RateTheApp;
