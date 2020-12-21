import { createSelector } from 'reselect';
import { RootState } from '../../../config/store';

export const selectAllDecks = (state: RootState) => state.decks;
export const selectDecks = createSelector([selectAllDecks], (decks) => decks);

export const selectDeckItem = (id: string) =>
  createSelector(
    [selectDecks],
    (decks) => decks[id],
  );

export const selectCard = (deckId: string, id: string | undefined) =>
  createSelector(
    [selectDecks],
    (decks) => id ? decks[deckId].cards.find(card => card.id === id) : undefined
  );
