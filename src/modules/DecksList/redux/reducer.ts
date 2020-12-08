import * as R from 'ramda';
import { DecksActions, DecksActionTypes } from './interface';

export interface Card {
  question: string;
  answer: string;
  id: string;
  rank: number;
  isLearned: boolean;
}

export interface Deck {
  title: string;
  cards: Card[];
}

export interface DecksState {
  [id: string]: Deck;
}

export const initialState: DecksState = {};

const updateCards = R.curry((newCard: Partial<Card>, card: Card) => {
  if (newCard.id === card.id) {
    return { ...card, ...newCard };
  }
  return card;
});

export default function decks(state = initialState, action: DecksActions): DecksState {
  switch (action.type) {
    case DecksActionTypes.saveDeck: {
      if (action.id in state) {
        // rename current deck title
        return {
          ...state,
          [action.id]: { ...state[action.id], title: action.title },
        };
      }
      return { ...state, [action.id]: { title: action.title, cards: [] } };
    }
    case DecksActionTypes.deleteDeck: {
      return R.omit([action.id], state);
    }
    case DecksActionTypes.saveQuestion: {
      const { cardId, question, deckId, isEdit } = action;
      const selectedDeckCards = state[deckId].cards;
      if (isEdit) {
        const updatedCards: Card[] = R.map(updateCards({ id: cardId, question }), selectedDeckCards);
        return { ...state, [deckId]: { ...state[deckId], cards: updatedCards } };
      }
      const newCard = {
        id: cardId,
        question,
        answer: '',
        rank: 0,
        isLearned: false,
      };
      const newCards = R.prepend(newCard, selectedDeckCards); // unshift
      return { ...state, [deckId]: { ...state[deckId], cards: newCards } };
    }

    case DecksActionTypes.saveAnswer: {
      const { cardId, deckId, answer } = action;
      const selectedDeckCards = state[deckId].cards;
      const updatedCards: Card[] = R.map(updateCards({ id: cardId, answer }), selectedDeckCards);
      return { ...state, [deckId]: { ...state[deckId], cards: updatedCards } };
    }

    default:
      return state;
  }
}
