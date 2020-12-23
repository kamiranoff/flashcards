import { Dimensions, PixelRatio } from 'react-native';

export const width = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
const [shortDimension, longDimension] = width < WINDOW_HEIGHT ? [width, WINDOW_HEIGHT] : [WINDOW_HEIGHT, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scaleSize = (size: number) => (width / guidelineBaseWidth) * size;
export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

export const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;

export const SPACING = 16;
export const ITEM_HEIGHT = WINDOW_HEIGHT * 0.14;

export const HIT_SLOP = {
  top: 10,
  left: 20,
  bottom: 20,
  right: 20,
};
