import React, { FC, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import * as Analytics from 'appcenter-analytics';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getBottomSpace, getPlatformDimension, isIOS, isLargeDevice, WINDOW_HEIGHT } from '../utils/device';
import assets from '../assets';
import PrimaryButton from './PrimaryButton';
import { analytics, theme } from '../utils';
import Api from '../api';
import GeneralAlert, { GeneralAlertRef, NotificationMessages } from './GeneralAlert';
import ProgressLoader from './ProgressLoader';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import IconButton from './IconButton';
import { Screens } from '../navigation/types';
import { PermissionStatus, usePhotoPermissions } from '../utils/usePhotoPermissions';
import { useCameraPermissions } from '../utils/useCameraPermissions';

interface Props {
  initialValue: string;
  onSubmit: (text: string) => void;
  placeholder: string;
}

const contentStyle = {
  backgroundColor: theme.colors.card,
  color: '#000',
  placeholderColor: theme.colors.p,
  contentCSSText: `font-size: 20px; min-height: ${WINDOW_HEIGHT - 220}px; height: 100%;`, // initial valid
};

const imageOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 621,
  maxWidth: 1366,
};

const Form: FC<Props> = ({ initialValue, onSubmit, placeholder }) => {
  const { permissionPhotoStatus, handleTriggerPhotoPermission } = usePhotoPermissions();
  const { permissionCameraStatus, handleTriggerCameraPermission } = useCameraPermissions();
  const navigation = useNavigation();
  const { shop } = useSelector((state: RootState) => state);
  const [value, setValue] = useState(initialValue);
  const richText = useRef<RichEditor>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const alertRef = useRef<GeneralAlertRef>(null);
  const isPro = shop.monthlySubscription || shop.yearlySubscription;

  const handleKeyboard = () => {
    const editor = richText.current!;
    if (editor.isKeyboardOpen) {
      editor.dismissKeyboard();
    } else {
      editor.focusContentEditor();
    }
  };

  const handleSubmit = () => {
    const editor = richText.current!;
    editor.dismissKeyboard();
    onSubmit(value);
  };

  const handleSetProgress = (progressEvent: ProgressEvent): void => {
    const val = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
    setProgress(val);
  };

  const saveAndInsertPhoto = async (res: ImagePickerResponse) => {
    const uri = res.assets && res.assets.length && res.assets[0].uri;
    if (uri) {
      setIsLoading(true);
      const fileType = uri.substr(uri.lastIndexOf('.') + 1);
      const file = {
        uri,
        name: `image.${fileType}?date=${Date.now()}`,
        type: `image/${fileType}`,
      };
      try {
        const photo = await Api.savePhoto(file, handleSetProgress);
        if (photo) {
          setIsLoading(false);
          richText.current?.insertHTML('<br />');
          richText.current?.insertImage(photo);
          richText.current?.insertHTML('<br />');
        }
      } catch (e) {
        alertRef?.current?.startAnimation();
        setIsLoading(false);
      } finally {
        setProgress(0);
      }
    }
  };
  const handlePressAddImage = () => {
    Analytics.trackEvent(analytics.addImageToCard).catch(null);

    if (permissionPhotoStatus !== PermissionStatus.GRANTED) {
      return handleTriggerPhotoPermission();
    }

    launchImageLibrary(imageOptions, async (res) => {
      await saveAndInsertPhoto(res);
    });
  };

  const handleInsertImageFromCamera = () => {
    if (permissionCameraStatus !== PermissionStatus.GRANTED) {
      return handleTriggerCameraPermission();
    }
    launchCamera(imageOptions, async (res) => {
      await saveAndInsertPhoto(res);
    });
  };

  const handleRenderActions = () => {
    const defaultActions = [
      actions.insertImage,
      actions.setBold,
      actions.setItalic,
      actions.insertBulletsList,
      actions.insertOrderedList,
      actions.undo,
      actions.redo,
    ];
    const proActions = [
      actions.setStrikethrough,
      actions.setUnderline,
      actions.blockquote,
      actions.heading1,
      actions.heading4,
      actions.code,
      actions.alignLeft,
      actions.alignCenter,
      actions.alignRight,
    ];
    if (isPro) {
      return [...defaultActions, 'onPressAddImageFromCamera', ...proActions];
    }
    return defaultActions;
  };

  const handleGoToShop = () => navigation.navigate(Screens.UPGRADE_TO_PRO_MODAL);

  return (
    <>
      <GeneralAlert text={NotificationMessages.ERROR} ref={alertRef} />
      {isLoading && <ProgressLoader progress={progress} />}
      <View style={styles.saveButton}>
        <PrimaryButton buttonText="Save" onPress={handleSubmit} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        style={styles.scrollView}
        alwaysBounceVertical={false}
        bounces={false}>
        <RichEditor
          initialFocus={false}
          pasteAsPlainText
          placeholder={placeholder}
          ref={richText}
          containerStyle={styles.richEditorContainer}
          editorStyle={contentStyle}
          onChange={setValue}
          initialContentHTML={value}
        />
      </ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={isIOS ? 0 : 25}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleKeyboard}>
            <Image source={assets.icons.keyboard} style={styles.keyboard} resizeMode="contain" />
          </TouchableOpacity>
          {!isPro && <IconButton onPress={handleGoToShop} iconName="basket" style={styles.basketIcon} />}
        </View>
        <RichToolbar
          style={styles.richToolBar}
          getEditor={() => richText.current!}
          iconTint="#282828"
          onPressAddImage={handlePressAddImage}
          /* @ts-ignore FIXME at some point */
          onPressAddImageFromCamera={handleInsertImageFromCamera}
          selectedIconTint={theme.colors.success}
          actions={handleRenderActions()}
          iconMap={{
            [actions.setStrikethrough]: () => (
              <Image source={assets.icons.strikethrough} resizeMode="contain" style={styles.toolbarIcon} />
            ),
            [actions.setUnderline]: () => (
              <Image source={assets.icons.underline} resizeMode="contain" style={styles.toolbarIcon} />
            ),
            [actions.heading1]: () => (
              <Image source={assets.icons.h1} resizeMode="contain" style={styles.toolbarIcon} />
            ),
            [actions.heading4]: () => (
              <Image source={assets.icons.h2} resizeMode="contain" style={styles.toolbarIcon} />
            ),
            onPressAddImageFromCamera: () => (
              <Image source={assets.icons.camera} resizeMode="contain" style={styles.toolbarIcon} />
            ),
          }}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 40,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  richEditorContainer: {
    marginHorizontal: 16,
    borderRadius: theme.borderRadius.m,
    marginBottom: isLargeDevice() ? 80 : 10,
  },
  saveButton: {
    width: 60,
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 15, 50, 20),
    zIndex: 999,
  },
  keyboard: {
    width: 60,
    height: 40,
  },
  basket: {
    width: 50,
    height: 25,
  },
  toolbarIcon: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  basketIcon: {
    backgroundColor: theme.colors.success,
    marginRight: 10,
    marginBottom: 10,
  },
  richToolBar: {
    backgroundColor: theme.colors.card,
    height: getPlatformDimension(60, 60, getBottomSpace() + 60),
  },
});

export default Form;
