import * as R from 'ramda';
import { DecksActions, DecksActionTypes } from './interface';

export interface Card {
  question: string;
  answer: string;
  id: number;
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

export default function decks(
  state = initialState,
  action: DecksActions,
): DecksState {
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
    default:
      return state;
  }
}
