import { Card, Deck } from '../redux/reducer';

export enum Screens {
  HOME = 'Home',
  DECK_DETAIL = 'DeckDetails',
  QUESTION_MODAL = 'QuestionModal',
  ANSWER_MODAL = 'AnswerModal',
  SETTINGS = 'Settings',
  MAIN = 'Main',
  PLAYGROUND = 'Playground',
  ALERT = 'Alert',
  DRAWER = 'Drawer',
  CONTACT = 'Contact',
}

export type RootStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.MAIN]: undefined;
  [Screens.QUESTION_MODAL]: { title: Deck['title']; deckId: string; cardId?: Card['id'] };
  [Screens.ANSWER_MODAL]: { title: Deck['title']; deckId: string; cardId: Card['id'] };
  [Screens.DECK_DETAIL]: { id: string; color: string };
  [Screens.PLAYGROUND]: { deckId: string; cardId: Card['id'] };
  [Screens.SETTINGS]: undefined;
  [Screens.ALERT]: undefined;
  [Screens.DRAWER]: undefined;
};

export type DrawerParamList = {
  [Screens.HOME]: undefined;
  [Screens.CONTACT]: undefined;
};
