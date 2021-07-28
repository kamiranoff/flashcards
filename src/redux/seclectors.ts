import { createSelector } from 'reselect';
import * as R from 'ramda';
import { RootState } from './store';

export const selectUserState = (state: RootState) => state.user;
export const selectUser = createSelector([selectUserState], (user) => user);
export const selectAllDecks = (state: RootState) => state.decks.decks;

export const selectDecksState = (state: RootState) => state.decks;

export const selectIsLoading = createSelector([selectDecksState], (decks) => decks.isLoading);
export const selectError = createSelector([selectDecksState], (decks) => decks.error);

export const selectMaxFreeDecks = (state: RootState) => state.decks.maxFreeDecks;

export const selectDecks = createSelector([selectAllDecks], (decks) => decks);

export const selectDeckItem = (id: string) => createSelector([selectDecks], (decks) => decks[id]);

export const selectCard = (deckId: string, id: number | undefined) =>
  createSelector([selectDecks], (decks) =>
    id ? decks[deckId].cards.find((card) => card.frontendId === id) : undefined,
  );

export const selectBadAnswers = (deckId: string) =>
  createSelector([selectDeckItem(deckId)], (decks) =>
    !R.isEmpty(decks) && decks.cards.length ? decks.cards.filter((c) => c.rank === 0).length : 0,
  );

export const selectGoodAnswers = (deckId: string) =>
  createSelector([selectDeckItem(deckId)], (decks) =>
    !R.isEmpty(decks) ? decks.cards.filter((c) => c.rank !== null && c.rank > 0).length : 0,
  );
