import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, PrimaryButton } from '../../common';
import CustomText from '../../common/CustomText';
import assets from '../../assets';
import { sendEmail } from '../../lib';

const RequestFeature: FC = () => {
  const handleRequestFeature = () => {
    sendEmail('czaplaanita@gmail.com', 'Request feature!').then(() => {
      console.log('Our email successful provided to device mail ');
    });
  };

  return (
    <Container style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={assets.icons.review} resizeMode="contain" style={styles.image} />
      </View>
      <View style={{ flex: 1 }}>
        <CustomText centered size="h2" textStyle={{ fontSize: 20 }}>
          Lets create progress together
        </CustomText>
        <CustomText centered size="h2">
          Do you miss a feature?
        </CustomText>
        <CustomText centered size="h2">
          Please send me an email and I will do my best to make it happen!
        </CustomText>
        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText="Send" onPress={handleRequestFeature} />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
    height: 300,
  },
  imageContainer: {
    flex: 1.5,
    marginLeft: 10,
    marginTop: 30,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: 150,
    alignSelf: 'center',
  },
});

export default RequestFeature;
