import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import React, { FC, useState } from 'react';
import { CloseButton, Container } from '../../common';
import { Auth0Credentials, Auth0UserInfo, getUserInfo } from '../../modules/Auth';
import { LoginButtons } from './components/LoginButtons';
import { saveUser, saveUserToDB } from '../../redux/user/actions';
import { Cache } from '../../utils/Cache';
import { Title } from './components/Title';
import { LoginOrSignupStackNavigationProp } from '../../navigation/types';

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
      <View style={styles.subContainer}>
        <LoginButtons user={user} onSuccess={handleLoginSuccess} onError={handleError} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  subContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: -60,
  },
});

export { LoginOrSignup };
