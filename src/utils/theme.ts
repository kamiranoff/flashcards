import { Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');
const aspectRatio = width / 375;

const palette = {
  softWhite: '#f5f4ee',
  dirtyWhite: '#f9f9f9',
  lightOrange: '#e4d6cc',
  orange: '#f3d4c1',
  darkOrange: '#ffad8b',
  yellow: '#fbe29f',
  fadeYellow: '#e1d1a6',
  lightViolet: '#d9dbed',
  violet: '#c1cbe7',
  lightBlue: '#BFEAF5',
  lightPink: '#eceae8',
  pink: '#ebb9cb',
  fadePink: '#d8c8bd',
  blue: '#c1cbe7',
  lightGreen: '#c9e5dc',
  green: '#94c7b6',
  fadeGreen: '#bedcd3',
  superLightGreen: '#bed8d1',
  fadeGray: '#dbdfe2',
  gray: '#222',
  darkGray: '#2c2c2d',
  lightGray: '#d1d2d1',
};

const theme = {
  colors: {
    success: palette.green,
    alert: palette.yellow,
    warning: palette.orange,
    icon: palette.softWhite,
    border: palette.gray,
    background: palette.fadeGray,
    background2: palette.fadeGreen,
    background3: palette.gray,
    buttonBackground: palette.darkGray,
    buttonText: palette.lightGray,
    drawer: palette.dirtyWhite,
    list: [
      palette.softWhite,
      palette.lightOrange,
      palette.yellow,
      palette.orange,
      palette.superLightGreen,
      palette.violet,
    ],
    drawerItem: {
      home: palette.lightGreen,
      improve: palette.fadeYellow,
      feature: palette.darkOrange,
      share: palette.fadePink,
      rate: palette.lightPink,
      freeDeck: palette.lightViolet,
      upgrade: palette.green,
      contact: palette.blue,
    },
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 25,
    xl: 75,
  },
  buttonShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconButtonShadow: {
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export default theme;
