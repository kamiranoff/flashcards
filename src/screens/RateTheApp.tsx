import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, PrimaryButton } from '../common';
import CustomText from '../common/CustomText';

const RateTheApp: FC = () => (
  <Container style={styles.container}>
    <CustomText centered size="h2">
      How does our app helping you learn?
    </CustomText>
    <View style={styles.buttonContainer}>
      <PrimaryButton buttonText="Rate & Review" onPress={() => null} />
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: 140,
    alignSelf: 'center',
  },
});

export default RateTheApp;
