import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, PrimaryButton } from '../../common';
import CustomText from '../../common/CustomText';
import assets from '../../assets';

const GetFreebie: FC = () => (
  <Container style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={assets.icons.faces} resizeMode="contain" />
    </View>
    <View style={{ flex: 1 }}>
      <CustomText centered size="h2">
        Send invite to your friends & get extra free deck!
      </CustomText>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText="Invite" onPress={() => null} />
      </View>
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    flex: 2,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: 120,
    alignSelf: 'center',
  },
});

export default GetFreebie;
