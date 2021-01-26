import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, PrimaryButton } from '../../common';
import CustomText from '../../common/CustomText';
import assets from '../../assets';
import { getPlatformDimension } from '../../utils/device';

const ShareTheApp: FC = () => (
  <Container style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={assets.icons.faces} resizeMode="contain" />
    </View>
    <View style={{ flex: 1 }}>
      <CustomText centered size="h2">
        Enjoying the app?
      </CustomText>
      <CustomText centered size="h2">
        Share it with your friends
      </CustomText>
      <CustomText centered size="h2">
        & get extra free deck!
      </CustomText>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText="Share" onPress={() => null} />
      </View>
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1.6,
    marginLeft: 10,
    marginTop: getPlatformDimension(60, 60, 80, 100),
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: 120,
    alignSelf: 'center',
  },
});

export default ShareTheApp;
