import React, { FC, useCallback, useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Container, GeneralAlert } from '../../common';
import DecksList from './DecksList';
import { HomeScreenNavigationProp, Screens } from '../../navigation/types';
import { GeneralAlertRef, NotificationMessages } from '../../common/GeneralAlert';
import useNetInfo from '../../hooks/useNetInfo';
import { Header } from './Header';
import { BottomSheetModal } from '../../common/BottomSheetModal';
import { CodeContentPopup } from '../../components/Popups/CodeContentPopup';
import { Title } from './BottomSheetContent/Title';

type Props = {
  navigation: HomeScreenNavigationProp;
};

export enum BottomSheetType {
  CODE,
  EDIT_TITLE,
}

const Home: FC<Props> = ({ navigation }) => {
  const refRBSheet = useRef<RBSheet>(null);
  const isConnected = useNetInfo();
  const alertRef = useRef<GeneralAlertRef>(null);
  const [currentDeckId, setCurrentDeckId] = useState('');
  const [bottomSheetContent, setBottomSheetContent] = useState<null | BottomSheetType>(null);
  const handleNavigateToAddDeck = () => navigation.navigate(Screens.ADD_DECK);
  const isCodeBottomSheet = bottomSheetContent === BottomSheetType.CODE;

  const handleOpenBottomModal = () => {
    if (!isConnected) {
      return alertRef.current?.startAnimation(NotificationMessages.NETWORK_ERROR);
    }
    setBottomSheetContent(BottomSheetType.CODE);
    refRBSheet.current?.open();
  };

  const handleCloseBottomModal = () => refRBSheet.current?.close();

  const handleTitleEdit = useCallback((id) => {
    setBottomSheetContent(BottomSheetType.EDIT_TITLE);
    setCurrentDeckId(id);
    refRBSheet.current?.open();
  }, []);

  return (
    <Container>
      <GeneralAlert ref={alertRef} />
      <Header
        handleNavigateToAddDeck={handleNavigateToAddDeck}
        handleOpenBottomModal={handleOpenBottomModal}
      />
      <DecksList onChangeTitle={handleTitleEdit} />
      <BottomSheetModal ref={refRBSheet} height={isCodeBottomSheet ? 260 : 200}>
        {isCodeBottomSheet ? (
          <CodeContentPopup handleGoBack={handleCloseBottomModal} />
        ) : (
          <Title handleGoBack={handleCloseBottomModal} deckId={currentDeckId} />
        )}
      </BottomSheetModal>
    </Container>
  );
};

export default Home;
