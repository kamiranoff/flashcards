import { createSelector } from 'reselect';
import { RootState } from '../../../config/store';

export const selectAllDecks = (state: RootState) => state.decks;

export const selectDecks = createSelector([selectAllDecks], (decks) => decks);
