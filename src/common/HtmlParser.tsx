import React, { FC } from 'react';
import { HtmlParseAndView, HtmlStyles } from '@react-native-html/renderer';

interface Props {
  text: string;
  isSliced?: boolean;
}

const HtmlParser: FC<Props> = ({ text, isSliced = false }) => {
  const slicedText = text.length < 30 ? `${text.slice(0, 22)}...` : `${text.slice(0, 40)}...`;
  return <HtmlParseAndView rawHtml={isSliced ? slicedText : text} htmlStyles={htmlStyles} />;
};

const htmlStyles: HtmlStyles = {
  text: {
    fontSize: 18,
    lineHeight: 18 * 1.2,
  },
  paragraph: {
    marginVertical: 10,
  },
  image: {
    marginVertical: 0,
  },
  list: {
    marginVertical: 5,
  },
  h1: {
    fontSize: 20,
    lineHeight: 18 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  h2: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  h3: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  listItem: {
    marginVertical: 2,
  },
  listItemContent: {},
};

export default HtmlParser;
