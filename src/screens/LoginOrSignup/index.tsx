import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { AppText, CloseButton, Container, PrimaryButton } from '../../common';
import { LoginButtons } from './components/LoginButtons';
import { Title } from './components/Title';
import { LoginOrSignupStackNavigationProp, Screens } from '../../navigation/types';
import animations from '../../assets/animations';
import { useUserCredentials } from './hooks/useUserCredentials';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/seclectors';

interface Props {
  navigation: LoginOrSignupStackNavigationProp;
}

const LoginOrSignup: FC<Props> = ({ navigation }) => {
  const user = useSelector(selectUser);
  const { handleLoginSuccess, handleError } = useUserCredentials(navigation);

  const navigateToLoginViaSms = () => {
    navigation.navigate(Screens.LOGIN_VIA_SMS);
  };

  return (
    <Container style={styles.container}>
      <CloseButton onPress={() => navigation.goBack()} />
      <Title primaryText="Let's sign you in." secondaryText="Save your flashcards. Share freely." />
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.security} />
      </View>
      <View style={styles.subContainer}>
        <PrimaryButton
          hasShadow={false}
          onPress={navigateToLoginViaSms}
          buttonText="Login via SMS"
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonText}
        />
        <AppText size="h2" centered>
          or
        </AppText>
        <LoginButtons onSuccess={handleLoginSuccess} onError={handleError} />
        {user.loginMethod ? (
          <AppText size="body" centered>
            You've signed in with {user.loginMethod} previously.
          </AppText>
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  subContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: 240,
  },
  animationContainer: {
    marginTop: 30,
    flex: 0.7,
    alignItems: 'center',
  },
  buttonStyle: {
    width: 180,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    color: '#000',
  },
});

export { LoginOrSignup };
