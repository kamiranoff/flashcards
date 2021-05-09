import { Card } from './reducer';

export enum DecksActionTypes {
  getDecks = 'GET_DECKS',
  deleteDeck = 'DELETE_DECK',
  saveDeck = 'SAVE_DECK',
  updateDeck = 'UPDATE_DECK',
  saveDeckToDB = 'SAVE_DECK_TO_DB',
  saveDeckToDBFailure = 'SAVE_DECK_TO_DB_FAILURE',
  saveQuestion = 'SAVE_QUESTION',
  saveAnswer = 'SAVE_ANSWER',
  deleteCard = 'DELETE_CARD',
  scoreCard = 'SCORE_CARD',
  reorderCards = 'REORDER_CARDS',
  shuffleCards = 'SHUFFLE_CARDS',
  getDeckByShareId = 'GET_DECK_BY_SHARE_ID',
  addFreeDeck = 'ADD_FREE_DECK',
  saveSharedDeckFailure = 'SAVE_SHARED_DECK_FAILURE',
  clearDecksError = 'CLEAR_DECKS_ERROR',
  getDeckByShareIdRequest = 'GET_DECK_BY_SHARE_ID_REQUEST',
  saveNewCard = 'SAVE_NEW_CARD',
  updateCardById = 'UPDATE_CARD_BY_ID',
  saveOrUpdateCardToDBFailure = 'SAVE_OR_UPDATE_CARD_TO_DB_FAILURE',
}

export enum SCORES {
  BAD = 0,
  GOOD = 1,
}

export interface GetDecks {
  type: DecksActionTypes.getDecks;
}

export interface SaveDeck {
  type: DecksActionTypes.saveDeck;
  id: string;
  title: string;
}

export interface SaveDeckToDB {
  type: DecksActionTypes.saveDeckToDB;
  deckId: string;
}

export interface SaveDeckToDBFailure {
  type: DecksActionTypes.saveDeckToDBFailure;
  error: boolean;
}

export interface SaveOrUpdateCardToDBFailure {
  type: DecksActionTypes.saveOrUpdateCardToDBFailure;
  error: boolean;
}

export interface UpdateDeck {
  type: DecksActionTypes.updateDeck;
  deckId: string;
  data: any;
}

export interface UpdateCardById {
  type: DecksActionTypes.updateCardById;
  deckId: string;
  data: Card;
}

export interface DeleteDeck {
  type: DecksActionTypes.deleteDeck;
  id: string;
}

export interface SaveQuestion {
  type: DecksActionTypes.saveQuestion;
  deckId: string;
  frontEndId: number;
  question: string;
  isEdit: boolean;
}

export interface SaveAnswer {
  type: DecksActionTypes.saveAnswer;
  deckId: string;
  cardId: number;
  answer: string;
}

export interface SaveNewCard {
  type: DecksActionTypes.saveNewCard;
  deckId: string;
  frontEndId: number;
  isEdit: boolean;
}

export interface DeleteCard {
  type: DecksActionTypes.deleteCard;
  deckId: string;
  cardId: number;
}

export interface ScoreCard {
  type: DecksActionTypes.scoreCard;
  deckId: string;
  cardId: number;
  score: number;
}

export interface ReorderCards {
  type: DecksActionTypes.reorderCards;
  deckId: string;
}

export interface ShuffleCards {
  type: DecksActionTypes.shuffleCards;
  deckId: string;
}

export interface GetDeckByShareId {
  type: DecksActionTypes.getDeckByShareId;
  code: string;
  deckId: string | null;
}

export interface AddFreeDeck {
  type: DecksActionTypes.addFreeDeck;
  quantity: number;
}

export interface SaveSharedDeckFailure {
  type: DecksActionTypes.saveSharedDeckFailure;
  error: boolean;
}

export interface ClearDecksError {
  type: DecksActionTypes.clearDecksError;
  error: boolean;
}

export interface GetDeckByShareIdRequest {
  type: DecksActionTypes.getDeckByShareIdRequest;
}

export type DecksActions =
  | GetDecks
  | SaveDeck
  | DeleteDeck
  | SaveQuestion
  | SaveAnswer
  | DeleteCard
  | ScoreCard
  | ReorderCards
  | ShuffleCards
  | GetDeckByShareId
  | AddFreeDeck
  | SaveSharedDeckFailure
  | ClearDecksError
  | GetDeckByShareIdRequest
  | SaveDeckToDBFailure
  | UpdateDeck
  | UpdateCardById;
