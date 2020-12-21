import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface Props {
  children: string | ReactNode | ReactNodeArray;
  centered?: boolean;
  textStyle?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}

type TTextAlign = 'left' | 'center' | 'auto' | 'right' | 'justify' | undefined;

const CustomText: FC<Props> = ({ children, centered = false, textStyle = {} }) => {
  const styles = [{ textAlign: centered ? 'center' : ('left' as TTextAlign) }, textStyle];

  return <Text style={styles}>{children}</Text>;
};

export default CustomText;
