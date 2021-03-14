import { Card, Deck } from '../redux/decks/reducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

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
  IMPROVE_THE_APP = 'ImproveTheApp',
  SHOP = 'Shop',
}

export type ModalTemplate = 'shareModal' | 'alertModal' | 'codeModal';

export type RootStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.QUESTION_MODAL]: { title: Deck['title']; deckId: string; cardId?: Card['id'] };
  [Screens.ANSWER_MODAL]: { title: Deck['title']; deckId: string; cardId: Card['id'] };
  [Screens.DECK_DETAIL]: { id: string; color: string };
  [Screens.PLAYGROUND]: { deckId: string; cardId: Card['id'] };
  [Screens.SETTINGS]: undefined;
  [Screens.ALERT]: { modalTemplate: ModalTemplate; deckId: string };
  [Screens.DRAWER]: undefined;
  [Screens.ADD_DECK]: undefined;
  [Screens.SHOP]: undefined;
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
  [Screens.IMPROVE_THE_APP]: undefined;
  [Screens.SHOP]: undefined;
};

export type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, Screens.DRAWER_SCREENS>;
export type GetFreebieScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.UPGRADE>;
export type AddAnswerScreenRouteProp = RouteProp<RootStackParamList, Screens.ANSWER_MODAL>;
export type AddAnswerScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ANSWER_MODAL>;
export type UpgradeScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.UPGRADE>;
export type ShopScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.SHOP>;
export type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
export type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;
export type AlertScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ALERT>;
export type AlertScreenRouteProp = RouteProp<RootStackParamList, Screens.ALERT>;
export type AddQuestionScreenRouteProp = RouteProp<RootStackParamList, Screens.QUESTION_MODAL>;
export type AddQuestionScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.QUESTION_MODAL>;
export type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;
export type AddDeckScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ADD_DECK>;
