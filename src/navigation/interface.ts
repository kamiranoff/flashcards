import { Card, Deck } from '../redux/reducer';

export enum Screens {
  HOME = 'Home',
  DECK_DETAIL = 'DeckDetails',
  QUESTION_MODAL = 'QuestionModal',
  ANSWER_MODAL = 'AnswerModal',
  SETTINGS = 'Settings',
  PLAYGROUND = 'Playground',
  ALERT = 'Alert',
  DRAWER = 'Drawer',
  GET_FREEBIE = 'GetFreebie',
  RATE_THE_APP = 'RateTheApp',
  ADD_DECK = 'AddDeck',
  SHARE_THE_APP = 'ShareTheApp',
  UPGRADE = 'Upgrade',
  REQUEST_FEATURE = 'RequestFeature',
  CONTACT = 'Contact',
  DRAWER_SCREENS = 'DrawerScreens',
}

export type RootStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.QUESTION_MODAL]: { title: Deck['title']; deckId: string; cardId?: Card['id'] };
  [Screens.ANSWER_MODAL]: { title: Deck['title']; deckId: string; cardId: Card['id'] };
  [Screens.DECK_DETAIL]: { id: string; color: string };
  [Screens.PLAYGROUND]: { deckId: string; cardId: Card['id'] };
  [Screens.SETTINGS]: undefined;
  [Screens.ALERT]: undefined;
  [Screens.DRAWER]: undefined;
  [Screens.ADD_DECK]: undefined;
};

export type DrawerStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.DRAWER_SCREENS]: undefined;
  [Screens.GET_FREEBIE]: undefined;
  [Screens.RATE_THE_APP]: undefined;
  [Screens.SHARE_THE_APP]: undefined;
  [Screens.UPGRADE]: undefined;
  [Screens.REQUEST_FEATURE]: undefined;
  [Screens.CONTACT]: undefined;
};
