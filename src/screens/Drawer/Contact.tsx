import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container, PrimaryButton } from '../../common';
import CustomText from '../../common/CustomText';
import { sendEmail } from '../../lib';
import animations from '../../assets/animations';
import { getPlatformDimension } from '../../utils/device';
import * as Analytics from 'appcenter-analytics';
import { analytics } from '../../utils';

const Contact: FC = () => {
  const handleContact = () => {
    Analytics.trackEvent(analytics.contactUs).catch(null);
    sendEmail('czaplaanita@gmail.com', 'Hello from FlashCard App!').then(() => {
      console.log('Our email successful provided to device mail ');
    });
  };

  return (
    <Container style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.contact} />
      </View>
      <View style={styles.content}>
        <CustomText centered size="h2">
          Any issues?
        </CustomText>
        <CustomText centered size="h2">
          Please contact us
        </CustomText>
        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText="Contact us" onPress={handleContact} />
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
    width: 120,
    alignSelf: 'center',
  },
  animationContainer: {
    flex: 1.2,
    alignItems: 'center',
    marginTop: getPlatformDimension(60, 60, 80, 100),
  },
  content: {
    flex: 1,
    marginVertical: 20,
  },
});

export default Contact;
