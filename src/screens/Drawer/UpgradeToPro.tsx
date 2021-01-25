import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, PrimaryButton } from '../../common';
import CustomText from '../../common/CustomText';
import assets from '../../assets';
import { theme } from '../../utils';

const UpgradeToPro: FC = () => (
  <Container style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={assets.icons.review} resizeMode="contain" style={styles.image} />
    </View>
    <View style={{ flex: 1 }}>
      <CustomText centered size="h2">
        Upgrade to Pro
      </CustomText>
      <CustomText centered size="h2">
        hello
      </CustomText>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          buttonText="Upgrade"
          onPress={() => null}
          buttonStyle={{ backgroundColor: theme.colors.drawerItem.upgrade }}
          buttonTextStyle={{ color: theme.colors.border }}
        />
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

export default UpgradeToPro;
