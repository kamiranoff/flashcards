import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { StyleProp, Text, TextStyle, StyleSheet } from 'react-native';
import { FONT_BOLD, FONT_REGULAR, FONT_SIZE_12, FONT_SIZE_16 } from '../styles/typography';

interface Props {
  children: string | ReactNode | ReactNodeArray;
  centered?: boolean;
  size: TTextSize;
  textStyle?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}

type TTextAlign = 'left' | 'center' | 'auto' | 'right' | 'justify' | undefined;
type TTextSize = 'h1' | 'h2';

export enum TextSize {
  H1 = 'h1',
  H2 = 'h2',
}

console.log('FONT_BOLD', { ...FONT_BOLD});
const styles = StyleSheet.create({
  h1: {
    ...FONT_BOLD, // Here I dont understand why typescript is not happy
    fontSize: FONT_SIZE_16,
    fontWeight: 'bold', // FIXME - this shouldn't be declared here
  },
  h2: {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_12,
    fontWeight: 'normal',
  },
});

const getStyles = (size: TextSize | TTextSize) => {
  switch (size) {
    case TextSize.H1:
      return styles.h1;
    case TextSize.H2:
      return styles.h2;
    default:
      return {};
  }
};

const CustomText: FC<Props> = ({ children, centered = false, size, textStyle = {} }) => {
  const customStyle = getStyles(size);
  const style = [{ textAlign: centered ? 'center' : ('left' as TTextAlign) }, customStyle, textStyle];

  return <Text style={style}>{children}</Text>;
};

export default CustomText;
