import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container, PrimaryButton, AppText } from '../../common';
import { sendEmail } from '../../lib';
import animations from '../../assets/animations';
import { getPlatformDimension } from '../../utils/device';

const RequestFeature: FC = () => {
  const handleRequestFeature = () => {
    sendEmail('czaplaanita@gmail.com', 'Request a feature!').then(() => {
      console.log('Our email successful provided to device mail ');
    });
  };

  return (
    <Container style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.growth} />
      </View>
      <View style={styles.content}>
        <AppText centered size="h2">
          Do you miss a feature?
        </AppText>
        <AppText centered size="h2">
          Let's create it together!
        </AppText>
        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText="Request a feature" onPress={handleRequestFeature} />
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
  buttonContainer: {
    marginTop: 20,
    width: 180,
    alignSelf: 'center',
  },
  animationContainer: {
    flex: 1.4,
    marginTop: getPlatformDimension(60, 60, 80, 100),
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginVertical: 20,
  },
});

export default RequestFeature;
