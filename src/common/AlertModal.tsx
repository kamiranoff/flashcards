import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList, Screens } from '../navigation/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { getPlatformDimension, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/device';
import { RouteProp } from '@react-navigation/native';
import IconButton from './IconButton';
import { ShareContentModal } from '../components/Modals/ShareContentModal';
import { CodeContentModal } from '../components/Modals/CodeContentModal';

export type AlertScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ALERT>;
export type AlertScreenRouteProp = RouteProp<RootStackParamList, Screens.ALERT>;

export interface Props {
  navigation: AlertScreenNavigationProp;
  route: AlertScreenRouteProp;
}

const AlertModal: FC<Props> = ({ navigation, route: { params } }) => {
  const handleGoBack = () => navigation.pop();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          params.modalTemplate === 'codeModal'
            ? { height: WINDOW_HEIGHT / 3 }
            : { height: WINDOW_HEIGHT / getPlatformDimension(2, 2, 2.5) },
        ]}>
        <View style={styles.closeButton}>
          <IconButton onPress={handleGoBack} iconName="x" />
        </View>
        {params.modalTemplate === 'shareModal' ? (
          <ShareContentModal deckId={params.deckId} />
        ) : (
          <CodeContentModal navigation={navigation} />
        )}
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
    width: WINDOW_WIDTH - 30, // FIXME width tablets??
    height: WINDOW_HEIGHT / 3,
  },
});

export default AlertModal;
