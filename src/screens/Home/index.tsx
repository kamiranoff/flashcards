import React, { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Container, GeneralAlert } from '../../common';
import DecksList from './DecksList';
import { HomeScreenNavigationProp, Screens } from '../../navigation/types';
import { GeneralAlertRef, NotificationMessages } from '../../common/GeneralAlert';
import useNetInfo from '../../hooks/useNetInfo';
import { Header } from './Header';
import { BottomSheetModal } from '../../common/BottomSheetModal';
import { CodeContentPopup } from '../../components/Popups/CodeContentPopup';
import { WINDOW_HEIGHT } from '../../utils/device';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: FC<Props> = ({ navigation }) => {
  const refRBSheet = useRef<RBSheet>(null);
  const isConnected = useNetInfo();
  const alertRef = useRef<GeneralAlertRef>(null);
  const handleNavigateToAddDeck = () => navigation.navigate(Screens.ADD_DECK);

  const handleOpenBottomModal = () => {
    if (!isConnected) {
      return alertRef.current?.startAnimation(NotificationMessages.NETWORK_ERROR);
    }

    refRBSheet.current?.open();
  };

  const handleCloseBottomModal = () => refRBSheet.current?.close();

  return (
    <Container>
      <GeneralAlert ref={alertRef} />
      <Header
        handleNavigateToAddDeck={handleNavigateToAddDeck}
        handleOpenBottomModal={handleOpenBottomModal}
      />
      <DecksList />
      <SharedElement id="general.bg" style={styles.sharedElementStyle}>
        <View style={styles.dummy} />
      </SharedElement>
      <BottomSheetModal ref={refRBSheet} height={260}>
        <CodeContentPopup handleGoBack={handleCloseBottomModal} />
      </BottomSheetModal>
    </Container>
  );
};

const styles = StyleSheet.create({
  sharedElementStyle: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: WINDOW_HEIGHT }],
  },
  dummy: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    transform: [{ translateY: 0 }],
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },
});

export default Home;
