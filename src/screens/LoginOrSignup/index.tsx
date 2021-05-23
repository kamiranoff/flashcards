import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import React, { FC, useState } from 'react';
import { CloseButton, Container } from '../../common';
import { Auth0Credentials, Auth0UserInfo, getUserInfo } from '../../modules/Auth';
import { LoginButtons } from './components/LoginButtons';
import { saveUser, saveUserToDB } from '../../redux/user/actions';
import { Cache } from '../../utils/Cache';
import { Title } from './components/Title';
import { LoginOrSignupStackNavigationProp } from '../../navigation/types';
import animations from '../../assets/animations';

interface Props {
  navigation: LoginOrSignupStackNavigationProp;
}

const LoginOrSignup: FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<Auth0UserInfo | null>(null);
  const dispatch = useDispatch();

  const handleLoginSuccess = async (credentials: Auth0Credentials) => {
    if (credentials) {
      await Cache.setAccessToken(credentials.accessToken);
      await getUserInfo(credentials.accessToken, handleUserInfoSuccess, handleError);
    }
  };

  const handleUserInfoSuccess = async (u: Auth0UserInfo) => {
    dispatch(saveUser(u.name, u.givenName, u.picture, u.sub));
    dispatch(saveUserToDB());
    setUser(u);
    return navigation.goBack();
  };

  // TODO: handle errors
  const handleError = (error: Error) => console.log('error', error);

  return (
    <Container style={styles.container}>
      <CloseButton onPress={() => navigation.goBack()} />
      <Title />
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.security} />
      </View>
      <View style={styles.subContainer}>
        <LoginButtons user={user} onSuccess={handleLoginSuccess} onError={handleError} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  subContainer: {
    alignSelf: 'center',
    marginTop: 30,
    width: 240,
  },
  animationContainer: {
    marginTop: 30,
    flex: 0.6,
    alignItems: 'center',
  },
});

export { LoginOrSignup };
