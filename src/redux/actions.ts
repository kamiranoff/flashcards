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
  EditSharedOnDeck,
  SaveSharedDeck,
} from './interface';
import { Deck } from './reducer';

export const getDecks = (): GetDecks => ({
  type: DecksActionTypes.getDecks,
});

export const saveDeck = (id: string, title: string): SaveDeck => ({
  type: DecksActionTypes.saveDeck,
  id,
  title,
});

export const deleteDeck = (id: string): DeleteDeck => ({
  type: DecksActionTypes.deleteDeck,
  id,
});

export const saveQuestion = (
  deckId: string,
  cardId: string,
  question: string,
  isEdit: boolean,
): SaveQuestion => ({
  type: DecksActionTypes.saveQuestion,
  deckId,
  cardId,
  question,
  isEdit,
});

export const saveAnswer = (deckId: string, cardId: string, answer: string): SaveAnswer => ({
  type: DecksActionTypes.saveAnswer,
  deckId,
  cardId,
  answer,
});

export const deleteCard = (deckId: string, cardId: string) => ({
  type: DecksActionTypes.deleteCard,
  deckId,
  cardId,
});

export const scoreCard = (deckId: string, cardId: string, score: number): ScoreCard => ({
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

export const editSharedOnDeck = (deckId: string): EditSharedOnDeck => ({
  type: DecksActionTypes.editSharedOnDeck,
  deckId,
});

export const saveSharedDeck = (deck: Deck, id: string): SaveSharedDeck => ({
  type: DecksActionTypes.saveSharedDeck,
  deck,
  id,
});
