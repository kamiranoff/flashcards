import React, { forwardRef, ReactNode } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { theme } from '../utils';

const RB_SHEET_STYLE = {
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  draggableIcon: {
    backgroundColor: theme.colors.lightBorder,
  },
};

interface Props {
  children: ReactNode;
  height?: number;
}

const BottomSheetModal = forwardRef<RBSheet, Props>(({ children, height = 440 }, ref) => (
  <RBSheet
    openDuration={500}
    ref={ref}
    closeOnDragDown
    closeOnPressMask
    height={height}
    dragFromTopOnly
    customStyles={RB_SHEET_STYLE}>
    {children}
  </RBSheet>
));

export { BottomSheetModal };
