import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AlertScreenNavigationProp, AlertScreenRouteProp, Screens } from '../../navigation/types';
import { getPlatformDimension, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/device';
import IconButton from '../../common/IconButton';
import { ShareContentPopup } from './ShareContentPopup';
import { CodeContentPopup } from './CodeContentPopup';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeckItem } from '../../redux/seclectors';
import { saveDeckToDB } from '../../redux/decks/actions';
import { RootState } from '../../redux/store';
import { GeneralAlertRef, NotificationMessages } from '../../common/GeneralAlert';
import { GeneralAlert } from '../../common';

export interface Props {
  navigation: AlertScreenNavigationProp;
  route: AlertScreenRouteProp;
}

const ShareCodePopups: FC<Props> = ({ navigation, route: { params } }) => {
  const handleGoBack = () => navigation.goBack();
  const alertRef = useRef<GeneralAlertRef>(null);
  const error = useSelector((state: RootState) => state.decks.error);

  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const { sub } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.modalTemplate === 'shareModal') {
      if (!sub) {
        navigation.navigate(Screens.LOGIN_OR_SIGNUP);
        return;
      }
      if (sub && deckDetail.isOwner && !deckDetail.shareId) {
        dispatch(saveDeckToDB(params.deckId));
        return;
      }
    }
  }, [sub]);

  useEffect(() => {
    if (error) {
      const message =
        error === 'Network Error' ? NotificationMessages.NETWORK_ERROR : NotificationMessages.ERROR;
      alertRef.current?.startAnimation(message);
    }
  }, [error]);

  alertRef.current?.startAnimation();
  return (
    <View style={styles.container}>
      <GeneralAlert text={NotificationMessages.ERROR} ref={alertRef} />
      <View
        style={[
          styles.content,
          params.modalTemplate === 'codeModal'
            ? { height: 250 }
            : { height: WINDOW_HEIGHT / getPlatformDimension(2, 2, 2.5) },
        ]}>
        <View style={styles.closeButton}>
          <IconButton onPress={handleGoBack} iconName="x" />
        </View>
        {params.modalTemplate === 'shareModal' ? (
          <ShareContentPopup deckId={params.deckId} handleGoBack={handleGoBack} />
        ) : (
          <CodeContentPopup navigation={navigation} />
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

export default ShareCodePopups;
