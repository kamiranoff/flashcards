export enum DecksActionTypes {
  getDecks = 'GET_DECKS',
  deleteDeck = 'DELETE_DECK',
  saveDeck = 'SAVE_DECK',
  saveQuestion = 'SAVE_QUESTION',
  saveAnswer = 'SAVE_ANSWER',
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

export type DecksActions = GetDecks | SaveDeck | DeleteDeck | SaveQuestion | SaveAnswer;
