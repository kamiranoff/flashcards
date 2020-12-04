import { Deck } from '../modules/DecksList/redux/reducer';

export enum Screens {
  HOME = 'Home',
  HOME_TABS = 'HomeTabs',
  HOME_STACK = 'HomeStack',
  DECK_DETAIL = 'DeckDetails',
  CREATE = 'Create',
  SETTINGS = 'Settings',
  MAIN = 'Main',
}

export type HomeStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.HOME_STACK]: undefined;
  [Screens.HOME_TABS]: undefined;
  [Screens.MAIN]: undefined;
  [Screens.CREATE]: undefined;
  [Screens.DECK_DETAIL]: { item: Deck };
  [Screens.SETTINGS]: undefined;
};
