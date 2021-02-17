import * as R from 'ramda';
import { nanoid } from 'nanoid';
import { DecksActions, DecksActionTypes, SCORES } from './interface';
import { shuffleArray } from '../lib';

export interface Card {
  question: string;
  answer: string;
  id: string;
  rank: number | null;
}

export interface Deck {
  title: string;
  owner: string;
  shareId: string;
  sharedByYou: boolean;
  sharedWithYou: boolean;
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
      return {
        ...state,
        [action.id]: {
          title: action.title,
          owner: '',
          shareId: nanoid(6),
          sharedByYou: false,
          sharedWithYou: false,
          cards: [],
        },
      };
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
        rank: null,
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

    case DecksActionTypes.deleteCard: {
      const { cardId, deckId } = action;
      const selectedDeckCards = state[deckId].cards;
      const updatedCards = R.reject(R.propEq('id', cardId), selectedDeckCards);
      return { ...state, [deckId]: { ...state[deckId], cards: updatedCards } };
    }

    case DecksActionTypes.scoreCard: {
      const { cardId, deckId, score } = action;
      const selectedDeckCards = state[deckId].cards;
      const card = R.find(R.propEq('id', cardId), selectedDeckCards);

      const rankScore = R.cond([
        [R.propEq('score', SCORES.BAD), R.always(0)],
        [R.propEq('score', SCORES.GOOD), ({ rank }: { rank: number }) => rank + 1],
      ])({ score, rank: card!.rank });

      const updatedCards: Card[] = R.map(updateCards({ id: cardId, rank: rankScore }), selectedDeckCards);
      return { ...state, [deckId]: { ...state[deckId], cards: updatedCards } };
    }

    case DecksActionTypes.reorderCards: {
      const { deckId } = action;
      const selectedDeckCards = state[deckId].cards;
      const sortByRank = R.sortWith([R.ascend(R.prop('rank'))]);

      return <DecksState>{ ...state, [deckId]: { ...state[deckId], cards: sortByRank(selectedDeckCards) } };
    }

    case DecksActionTypes.shuffleCards: {
      const { deckId } = action;
      const selectedDeckCards = state[deckId].cards;
      const cards = shuffleArray(selectedDeckCards);

      return <DecksState>{ ...state, [deckId]: { ...state[deckId], cards } };
    }
    case DecksActionTypes.editSharedOnDeck: {
      const { deckId } = action;
      return { ...state, [deckId]: { ...state[deckId], sharedByYou: true } };
    }
    case DecksActionTypes.saveSharedDeck: {
      const { deck, id } = action;
      if (id in state) {
        // do I need this?
        return {
          ...state,
          [id]: { ...state[id], ...deck },
        };
      }
      return {
        ...state,
        [id]: { ...deck },
      };
    }
    default:
      return state;
  }
}
