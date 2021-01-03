import React, { FC, useRef, useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { isIOS, moderateScale, WINDOW_HEIGHT } from '../styles/utils';
import assets from '../assets';

interface Props {
  initialValue: string;
  onSubmit: (text: string) => void;
  placeholder: string;
}

const contentStyle = {
  backgroundColor: '#FFFFFF',
  color: '#000',
  placeholderColor: 'gray',
  contentCSSText: `font-size: 16px; min-height: ${WINDOW_HEIGHT - 220}px; height: 100%;`, // initial valid
};

const Form: FC<Props> = ({ initialValue, onSubmit, placeholder }) => {
  const [value, setValue] = useState(initialValue);
  const richText = useRef<RichEditor>(null);

  const handleKeyboard = () => {
    const editor = richText.current!;
    if (editor.isKeyboardOpen) {
      editor.dismissKeyboard();
    } else {
      editor.focusContentEditor();
    }
  };

  const handlePressAddImage = () => {
    // TODO:
    console.log('pressed image');
  };

  return (
    <>
      <View style={styles.saveButton}>
        <Button title="Save" onPress={() => onSubmit(value)} />
      </View>
      <ScrollView keyboardDismissMode={'none'} style={styles.scrollView} alwaysBounceVertical={false} bounces={false}>
        <RichEditor
          initialFocus
          pasteAsPlainText
          placeholder={placeholder}
          ref={richText}
          containerStyle={styles.richEditorContainer}
          editorStyle={contentStyle}
          onChange={setValue}
          initialContentHTML={value}
        />
      </ScrollView>
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'}>
        <TouchableOpacity onPress={handleKeyboard}>
          <Image source={assets.icons.keyboard} style={styles.keyboard} resizeMode="contain" />
        </TouchableOpacity>
        <RichToolbar
          getEditor={() => richText.current!}
          iconTint="#282828"
          onPressAddImage={handlePressAddImage}
          selectedIconTint="#2095F2"
          actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.heading1,
            actions.heading4,
          ]}
          iconMap={{
            [actions.setStrikethrough]: () => (
              <Image source={assets.icons.strikethrough} resizeMode="contain" style={styles.toolbarIcon} />
            ),
            [actions.setUnderline]: () => (
              <Image source={assets.icons.underline} resizeMode="contain" style={styles.toolbarIcon} />
            ),
            [actions.heading1]: () => <Image source={assets.icons.h1} resizeMode="contain" style={styles.toolbarIcon} />,
            [actions.heading4]: () => <Image source={assets.icons.h2} resizeMode="contain" style={styles.toolbarIcon} />,
          }}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 30,
  },
  richEditorContainer: {
    marginHorizontal: 10,
  },
  saveButton: {
    right: 10,
    position: 'absolute',
    top: moderateScale(40),
    zIndex: 999,
  },
  keyboard: {
    width: 60,
    height: 40,
  },
  toolbarIcon: {
    width: 24,
    height: 24,
  },
});

export default Form;
