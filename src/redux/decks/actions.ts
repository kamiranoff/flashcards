import {
  SaveDeck,
  DecksActionTypes,
  DeleteDeck,
  GetDecks,
  SaveQuestion,
  SaveAnswer,
  ScoreCard,
  ReorderCards,
  ShuffleCards,
  GetDeckByShareId,
  SaveDeckToDB,
  SaveDeckToDBFailure,
  SaveNewCard,
  UpdateCardById,
  UpdateDeck,
  SaveOrUpdateCardToDBFailure,
} from './interface';
import { Card } from './reducer';

export const getDecks = (): GetDecks => ({
  type: DecksActionTypes.getDecks,
});

export const saveDeck = (id: string, title: string): SaveDeck => ({
  type: DecksActionTypes.saveDeck,
  id,
  title,
});

export const saveDeckToDB = (deckId: string): SaveDeckToDB => ({
  type: DecksActionTypes.saveDeckToDB,
  deckId,
});

export const saveDeckToDBFailure = (error: string): SaveDeckToDBFailure => ({
  type: DecksActionTypes.saveDeckToDBFailure,
  error,
});

export const saveOrUpdateCardToDBFailure = (error: string): SaveOrUpdateCardToDBFailure => ({
  type: DecksActionTypes.saveOrUpdateCardToDBFailure,
  error,
});

export const updateDeck = (deckId: string, data: any): UpdateDeck => ({
  type: DecksActionTypes.updateDeck,
  deckId,
  data,
});

export const updateCardById = (deckId: string, data: Omit<Card, 'isPublic' | 'owner'>): UpdateCardById => ({
  type: DecksActionTypes.updateCardById,
  deckId,
  data,
});

export const deleteDeck = (id: string): DeleteDeck => ({
  type: DecksActionTypes.deleteDeck,
  id,
});

export const saveQuestion = (
  deckId: string,
  frontendId: number,
  question: string,
  isEdit: boolean,
): SaveQuestion => ({
  type: DecksActionTypes.saveQuestion,
  deckId,
  frontendId,
  question,
  isEdit,
});

export const saveAnswer = (deckId: string, cardId: number, answer: string): SaveAnswer => ({
  type: DecksActionTypes.saveAnswer,
  deckId,
  cardId,
  answer,
});

export const deleteCard = (deckId: string, cardId: number) => ({
  type: DecksActionTypes.deleteCard,
  deckId,
  cardId,
});

export const scoreCard = (deckId: string, cardId: number, score: number): ScoreCard => ({
  type: DecksActionTypes.scoreCard,
  deckId,
  cardId,
  score,
});

export const sortByRankCards = (deckId: string): ReorderCards => ({
  type: DecksActionTypes.reorderCards,
  deckId,
});

export const shuffleCards = (deckId: string): ShuffleCards => ({
  type: DecksActionTypes.shuffleCards,
  deckId,
});

export const getDeckByShareId = (code: string, deckId: string | null): GetDeckByShareId => ({
  type: DecksActionTypes.getDeckByShareId,
  code,
  deckId,
});

export const addFreeDeck = (quantity: number) => ({
  type: DecksActionTypes.addFreeDeck,
  quantity,
});

export const saveNewCard = (deckId: string, frontendId: number, isEdit: boolean): SaveNewCard => ({
  type: DecksActionTypes.saveNewCard,
  deckId,
  frontendId,
  isEdit,
});

export const saveSharedDeckFailure = (error: string) => ({
  type: DecksActionTypes.saveSharedDeckFailure,
  error,
});

export const clearDecksError = () => ({
  type: DecksActionTypes.clearDecksError,
  error: null,
});

export const getDeckByShareIdError = (error: string) => ({
  type: DecksActionTypes.getDeckByShareIdError,
  error,
});
