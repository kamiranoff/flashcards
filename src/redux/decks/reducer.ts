import * as R from 'ramda';
import { DecksActions, DecksActionTypes, SCORES } from './interface';
import { shuffleArray } from '../../utils';

export interface Card {
  question: string;
  answer: string;
  id: number | null;
  frontendId: number;
  rank: number | null;
  isPublic: boolean;
  owner: string | null;
}

export interface Deck {
  title: string;
  owner: string;
  shareId: string;
  isOwner: boolean;
  deckId: number | null;
  sharedByYou: boolean;
  sharedWithYou: boolean;
  isPublic: boolean;
  cards: Card[];
  rank: number | null;
}

export interface DecksState {
  decks: {
    [id: string]: Deck;
  };
  maxFreeDecks: number;
  error: string | null;
  isLoading: boolean;
}

export const initialState: DecksState = {
  decks: {},
  maxFreeDecks: 5,
  error: null,
  isLoading: false,
};

const updateCards = R.curry((newCard: Partial<Card>, card: Card) => {
  if (newCard.frontendId === card.frontendId || newCard.id === card.id) {
    return { ...card, ...newCard };
  }
  return card;
});

export default function decks(state = initialState, action: DecksActions): DecksState {
  switch (action.type) {
    case DecksActionTypes.getDeckByShareId:
    case DecksActionTypes.saveDeckToDB:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case DecksActionTypes.getDeckByShareIdError:
    case DecksActionTypes.clearDecksError:
    case DecksActionTypes.saveSharedDeckFailure:
    case DecksActionTypes.saveDeckToDBFailure:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        decks: {
          ...state.decks,
        },
      };
    case DecksActionTypes.saveDeck: {
      if (action.id in state.decks) {
        // rename current deck title
        return {
          ...state,
          error: null,
          isLoading: false,
          decks: {
            ...state.decks,
            [action.id]: { ...state.decks[action.id], title: action.title },
          },
        };
      }
      return {
        ...state,
        error: null,
        isLoading: false,
        decks: {
          [action.id]: {
            title: action.title,
            owner: '',
            shareId: '',
            deckId: null,
            isOwner: true,
            sharedByYou: false,
            sharedWithYou: false,
            isPublic: false,
            cards: [],
            rank: null,
          },
          ...state.decks,
        },
      };
    }
    case DecksActionTypes.updateDeck: {
      if (R.isEmpty(state.decks)) {
        // If added shared deck and no local decks, add deckId from db
        const deckId = action.deckId.toString();
        return {
          ...state,
          error: null,
          isLoading: false,
          decks: {
            [deckId]: action.data,
          },
        };
      }
      return {
        ...state,
        error: null,
        isLoading: false,
        decks: {
          ...state.decks,
          [action.deckId]: action.data,
        },
      };
    }
    case DecksActionTypes.deleteDeck: {
      const updatedDecks = R.omit([action.id], state.decks);
      return {
        ...state,
        error: null,
        decks: updatedDecks,
      };
    }
    case DecksActionTypes.updateCardById: {
      const { deckId, data } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const updatedCards: Card[] = R.map(updateCards({ ...data }), selectedDeckCards);
      return {
        ...state,
        error: null,
        isLoading: false,
        decks: {
          ...state.decks,
          [deckId]: { ...state.decks[deckId], cards: updatedCards },
        },
      };
    }

    case DecksActionTypes.saveQuestion: {
      const { frontendId, question, deckId, isEdit, owner } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      if (isEdit) {
        const updatedCards: Card[] = R.map(updateCards({ frontendId, question }), selectedDeckCards);
        return {
          ...state,
          error: null,
          isLoading: false,
          decks: {
            ...state.decks,
            [deckId]: { ...state.decks[deckId], cards: updatedCards },
          },
        };
      }
      const newCard = {
        frontendId,
        question,
        answer: '',
        owner: owner || null,
        rank: null,
        isPublic: false,
        id: null, //db id
      };
      const newCards = R.prepend(newCard, selectedDeckCards); // unshift
      return {
        ...state,
        error: null,
        isLoading: false,
        decks: {
          ...state.decks,
          [deckId]: { ...state.decks[deckId], cards: newCards },
        },
      };
    }

    case DecksActionTypes.saveAnswer: {
      const { cardId, deckId, answer } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const updatedCards: Card[] = R.map(updateCards({ frontendId: cardId, answer }), selectedDeckCards);
      return {
        ...state,
        error: null,
        isLoading: false,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards: updatedCards,
          },
        },
      };
    }
    case DecksActionTypes.deleteCard: {
      const { cardId, deckId } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const updatedCards = R.reject(R.propEq('frontendId', cardId), selectedDeckCards);
      return {
        ...state,
        decks: {
          [deckId]: {
            ...state.decks[deckId],
            cards: updatedCards,
          },
        },
      };
    }

    case DecksActionTypes.scoreCard: {
      const { cardId, deckId, score } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const card = R.find(R.propEq('frontendId', cardId), selectedDeckCards);

      const rankScore = R.cond([
        [R.propEq('score', SCORES.BAD), R.always(0)],
        [R.propEq('score', SCORES.GOOD), ({ rank }: { rank: number }) => rank + 1],
      ])({ score, rank: card!.rank });

      const updatedCards: Card[] = R.map(
        updateCards({ frontendId: cardId, rank: rankScore }),
        selectedDeckCards,
      );
      return {
        ...state,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards: updatedCards,
          },
        },
      };
    }
    case DecksActionTypes.reorderCards: {
      const { deckId } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const sortByRank = R.sortWith([R.ascend(R.prop('rank'))]);

      return <DecksState>{
        ...state,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards: sortByRank(selectedDeckCards),
          },
        },
      };
    }
    case DecksActionTypes.shuffleCards: {
      const { deckId } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const cards = shuffleArray(selectedDeckCards);

      return <DecksState>{
        ...state,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards,
          },
        },
      };
    }

    case DecksActionTypes.addFreeDeck: {
      const { quantity } = action;
      return {
        ...state,
        maxFreeDecks: state.maxFreeDecks + quantity,
        decks: {
          ...state.decks,
        },
      };
    }

    default:
      return state;
  }
}
