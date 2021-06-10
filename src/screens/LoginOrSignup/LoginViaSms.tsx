import React, { FC, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppText, CloseButton, Container } from '../../common';
import { Input } from './components/Input';
import { LoginOrSignupStackNavigationProp } from '../../navigation/types';
import assets from '../../assets';
import { Title } from './components/Title';
import { useUserCredentials } from './hooks/useUserCredentials';

interface Props {
  navigation: LoginOrSignupStackNavigationProp;
}

const LoginViaSms: FC<Props> = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { handleLoginSuccess } = useUserCredentials(navigation);

  const handleSmsError = () => {
    setErrorMessage('Please try again');
  };

  const primaryText = success ? 'Enter code sent to your phone.' : 'Enter your phone number.';
  const secondaryText = success ? '' : 'We will send you confirmation code.';

  return (
    <Container style={styles.container}>
      <CloseButton onPress={() => navigation.goBack()} />
      <View style={styles.spacer}>
        <Title primaryText={primaryText} secondaryText={secondaryText} />
      </View>
      <View style={styles.imgContainer}>
        {!success ? <Image source={assets.icons.happyFace} style={styles.image} /> : null}
      </View>
      <View style={styles.content}>
        <Input
          onSuccess={handleLoginSuccess}
          onError={handleSmsError}
          onSmsSuccess={setSuccess}
          success={success}
        />
      </View>
      {errorMessage ? (
        <AppText size="body" centered>
          Please try again
        </AppText>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  content: {
    marginTop: 0,
  },
  image: {
    aspectRatio: 0.8,
    resizeMode: 'contain',
    width: 80,
  },
  imgContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  spacer: {
    marginTop: 50,
  },
});

export { LoginViaSms };
