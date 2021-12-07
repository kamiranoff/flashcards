import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, Container, PrimaryButton } from '../../common';
import { usePermissionsContext } from '../../context/PermissionsProvider';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Permissions = () => {
  const { goBack } = useNavigation();
  const {
    handleRequestPhotoLibraryPermission,
    isPhotoLibraryGranted,
    isPhotoLibraryLimited,
  } = usePermissionsContext();

  useEffect(() => {
    if (isPhotoLibraryGranted || isPhotoLibraryLimited) {
      return goBack();
    }
  }, [isPhotoLibraryGranted, goBack, isPhotoLibraryLimited]);

  if (isPhotoLibraryGranted) {
    return null;
  }
  return (
    <Container style={styles.container}>
      <AppText size="hero" centered textStyle={styles.text}>
        Want to add an image?
      </AppText>
      <AppText size="h2" centered>
        Continue to allow MyFlashcards to access your photo library.
      </AppText>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText="Continue" onPress={handleRequestPhotoLibraryPermission} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: 120,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    marginBottom: 20,
  },
});

export { Permissions };
