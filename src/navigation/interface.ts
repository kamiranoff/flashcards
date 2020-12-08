import { Card, Deck } from '../modules/DecksList/redux/reducer';

export enum Screens {
  HOME = 'Home',
  HOME_TABS = 'HomeTabs',
  DECK_DETAIL = 'DeckDetails',
  QUESTION_MODAL = 'QuestionModal',
  ANSWER_MODAL = 'AnswerModal',
  SETTINGS = 'Settings',
  MAIN = 'Main',
  PLAYGROUND = 'Playground',
}

export type RootStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.HOME_TABS]: undefined;
  [Screens.MAIN]: undefined;
  [Screens.QUESTION_MODAL]: { title: Deck['title']; deckId: string; cardId?: Card['id'] };
  [Screens.ANSWER_MODAL]: { title: Deck['title']; deckId: string; cardId: Card['id'] };
  [Screens.DECK_DETAIL]: { id: string };
  [Screens.PLAYGROUND]: { deckId: string; cardId: Card['id'] };
  [Screens.SETTINGS]: undefined;
};
