import { HTMLViewNode } from 'react-native-htmlview';
import { useIsMounted } from '../../hooks/useIsMounted';
import React, { useState } from 'react';
import { Image } from 'react-native';

const Img = ({ attribs }: { attribs: HTMLViewNode['attribs'] }) => {
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
    aspectRatio: imageWidth && imageHeight && imageHeight > 0 ? imageWidth / imageHeight : 1,
  };

  const source = {
    uri: attribs.src,
  };

  return <Image source={source} style={imgStyle} resizeMode="contain" />;
};

export { Img };
