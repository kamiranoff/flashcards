import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { SPACING, WINDOW_WIDTH } from '../utils/device';

interface Props {
  text: string | undefined;
  isSliced?: boolean;
}

const Img = (props: any) => {
  const imgStyle = {
    width: props.isSliced ? 140 : WINDOW_WIDTH - SPACING * 5, // FIXME
    height: props.isSliced ? 80 : undefined,
    aspectRatio: 1,
  };

  const source = {
    uri: props.attribs.src,
    width: imgStyle.width,
    height: imgStyle.height,
  };

  return <Image source={source} style={imgStyle} resizeMode="cover" />;
};

const HtmlParser: FC<Props> = ({ text, isSliced = false }) => {
  const slicedText = text ? `${text.slice(0, 150)}` : '';

  const renderNode = (node: any, index: number) => {
    if (node.name === 'img') {
      return <Img key={index} attribs={node.attribs} isSliced={isSliced} />;
    }
  };

  return text ? (
    <HTMLView
      renderNode={renderNode}
      value={isSliced ? slicedText : text}
      stylesheet={htmlStyles}
      addLineBreaks={false}
      textComponentProps={{ style: defaultStyle.text }}
    />
  ) : null;
};

const defaultStyle = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // links color
  },
  text: {
    fontSize: 18,
    lineHeight: 18 * 1.2,
  },
  paragraph: {
    fontSize: 16,
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
});

export default HtmlParser;
