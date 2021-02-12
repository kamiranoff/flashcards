import React, { FC } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { RootStackParamList, Screens } from '../navigation/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/device';
import CustomText from './CustomText';
import PrimaryButton from './PrimaryButton';
import { RouteProp } from '@react-navigation/native';
import IconButton from './IconButton';
import Icon from './Icon';

type AlertScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ALERT>;
type AlertScreenRouteProp = RouteProp<RootStackParamList, Screens.ALERT>;

export interface Props {
  navigation: AlertScreenNavigationProp;
  route: AlertScreenRouteProp;
}

const ShareContent = () => {
  const handleSharePress = () => DeviceEventEmitter.emit('share');
  return (
    <View style={styles.shareContainer}>
      <CustomText size="h2">"Knowledge shared</CustomText>
      <CustomText size="h2">is knowledge squared"</CustomText>
      <View style={styles.iconContainer}>
        <Icon name="happyFace2" imgStyle={styles.icon} />
      </View>
      <View style={styles.shareButtonContainer}>
        <PrimaryButton buttonText="Share your deck" onPress={handleSharePress} />
      </View>
    </View>
  );
};

const AlertModal: FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.closeButton}>
          <IconButton onPress={() => navigation.pop()} iconName="x" />
        </View>
        {params.modalTemplate === 'shareModal' ? <ShareContent /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    left: -10,
    position: 'absolute',
    top: -10,
    zIndex: 9,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 6,
    width: WINDOW_WIDTH - 30,
    height: WINDOW_HEIGHT / 2,
  },
  shareContainer: {
    flex: 1,
    marginTop: 80,
    alignContent: 'center',
    alignSelf: 'center',
  },
  shareButtonContainer: {
    marginTop: 10,
    width: 180,
    alignSelf: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    marginVertical: 36,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default AlertModal;
