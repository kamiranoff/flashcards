import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, PrimaryButton } from '../common';
import CustomText from '../common/CustomText';

const GetFreebie: FC = () => (
  <Container style={styles.container}>
    <CustomText centered size="h2">
      Send invite to your friends & get extra free deck!
    </CustomText>
    <View style={styles.buttonContainer}>
      <PrimaryButton buttonText="Invite" onPress={() => null} />
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: 120,
    alignSelf: 'center',
  },
});

export default GetFreebie;