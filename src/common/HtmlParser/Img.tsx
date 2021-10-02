import { HTMLViewNode } from 'react-native-htmlview';
import { useIsMounted } from '../../hooks/useIsMounted';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { theme } from '../../utils';

const Img = ({
  attribs,
  withImgContainer,
}: {
  attribs: HTMLViewNode['attribs'];
  withImgContainer?: boolean;
}) => {
  const isMounted = useIsMounted();
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);

  Image.getSize(attribs.src, (width, height) => {
    if (isMounted) {
      setImageWidth(width);
      setImageHeight(height);
    }
  });

  const imgStyle = {
    width: '100%',
    backgroundColor: theme.colors.card,
    marginBottom: 10,
    aspectRatio: imageWidth && imageHeight && imageHeight > 0 ? imageWidth / imageHeight : 1,
  };

  const source = {
    uri: attribs.src,
  };

  if (withImgContainer) {
    return (
      <View>
        <Image source={source} style={imgStyle} resizeMode="contain" />
      </View>
    );
  }
  return <Image source={source} style={imgStyle} resizeMode="contain" />;
};

export { Img };
