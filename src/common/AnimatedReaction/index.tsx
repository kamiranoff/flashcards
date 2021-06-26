import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedShape } from './AnimatedShape';
import { Shape, Shapes, ShapesExtra, ShapeType } from './Shape';
import { getRandomInt, randomEnum } from './utils';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/device';

type Props = {
  shapeType?: ShapeType;
  shapeNumbers?: number;
  startAnimation: boolean;
  onAnimationFinish: () => void;
};

const createIcon = (index: number) => {
  return {
    id: index,
    right: getRandomInt(20, WINDOW_WIDTH - 50),
    startingHeight: getRandomInt(WINDOW_HEIGHT - 200, WINDOW_HEIGHT),
  };
};

const getShapeType = (shape: ShapeType) => {
  if (shape === ShapesExtra.RANDOM) {
    return randomEnum(Shapes);
  }

  return shape;
};

const AnimatedReaction: FC<Props> = ({
  startAnimation,
  onAnimationFinish,
  shapeType = Shapes.SPARKLING_HEART,
  shapeNumbers = 50,
}) => {
  const [shape] = useState<ShapeType | Shapes>(getShapeType(shapeType));
  const [start, setStart] = useState(startAnimation);

  const [shapes, setShapes] = useState<{ id: number; right: number; startingHeight: number }[]>([]);

  useEffect(() => {
    const baseArray = Array(shapeNumbers).fill({});
    const _shapes = baseArray.map((_, index) => createIcon(index));
    setShapes(_shapes);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      setStart(startAnimation);
    }
  }, [startAnimation]);

  const handleShapeAnimationFinish = (id: number) => {
    if (id === shapes.length - 1) {
      setStart(false);
      onAnimationFinish();
    }
  };

  if (!start) return null;
  return (
    <View style={[styles.container]} pointerEvents="none">
      {shapes.map(({ id, right, startingHeight }) => (
        <AnimatedShape
          key={id}
          height={startingHeight}
          containerStyle={{ right }}
          id={id}
          onShapeAnimationFinish={handleShapeAnimationFinish}>
          <Shape type={shape} />
        </AnimatedShape>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export { AnimatedReaction };
