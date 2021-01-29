export enum DecksActionTypes {
  getDecks = 'GET_DECKS',
  deleteDeck = 'DELETE_DECK',
  saveDeck = 'SAVE_DECK',
  saveQuestion = 'SAVE_QUESTION',
  saveAnswer = 'SAVE_ANSWER',
  deleteCard = 'DELETE_CARD',
  scoreCard = 'SCORE_CARD',
  reorderCards = 'REORDER_CARDS',
  shuffleCards = 'SHUFFLE_CARDS',
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

export interface DeleteDeck {
  type: DecksActionTypes.deleteDeck;
  id: string;
}

export interface SaveQuestion {
  type: DecksActionTypes.saveQuestion;
  deckId: string;
  cardId: string;
  question: string;
  isEdit: boolean;
}

export interface SaveAnswer {
  type: DecksActionTypes.saveAnswer;
  deckId: string;
  cardId: string;
  answer: string;
}

export interface DeleteCard {
  type: DecksActionTypes.deleteCard;
  deckId: string;
  cardId: string;
}

export interface ScoreCard {
  type: DecksActionTypes.scoreCard;
  deckId: string;
  cardId: string;
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

export type DecksActions =
  | GetDecks
  | SaveDeck
  | DeleteDeck
  | SaveQuestion
  | SaveAnswer
  | DeleteCard
  | ScoreCard
  | ReorderCards
  | ShuffleCards;
