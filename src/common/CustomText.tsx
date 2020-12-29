import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { StyleProp, Text, TextStyle, StyleSheet } from 'react-native';
import { FONT_BOLD, FONT_REGULAR, FONT_SIZE_14, FONT_SIZE_16, FONT_SIZE_18 } from '../styles/typography';

interface Props {
  children: string | ReactNode | ReactNodeArray;
  centered?: boolean;
  underlined?: boolean;
  size: TTextSize;
  textStyle?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}

type TTextAlign = 'left' | 'center' | 'auto' | 'right' | 'justify' | undefined;
type TTextSize = 'h1' | 'h2' | 'h3';

export enum TextSize {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
}

const styles = StyleSheet.create({
  h1: {
    ...FONT_BOLD,
    fontSize: FONT_SIZE_18,
    fontWeight: 'bold', // FIXME - this shouldn't be declared here
  },
  h2: {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_16,
    fontWeight: 'normal',
  },
  h3: {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_14,
    fontWeight: 'normal',
  },
});

const getStyles = (size: TextSize | TTextSize) => {
  switch (size) {
    case TextSize.H1:
      return styles.h1;
    case TextSize.H2:
      return styles.h2;
    case TextSize.H3:
      return styles.h3;
    default:
      return {};
  }
};

const CustomText: FC<Props> = ({ children, underlined = false, centered = false, size, textStyle = {} }) => {
  const customStyle = getStyles(size);
  const style = [
    { textAlign: centered ? 'center' : ('left' as TTextAlign) },
    { textDecorationLine: underlined ? 'underline' : 'none' },
    customStyle,
    textStyle,
  ];

  return <Text style={style}>{children}</Text>;
};

export default CustomText;
