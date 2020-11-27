export interface Card {
  question: string;
  answer: string;
  id: number;
  rank: number;
  isLearned: boolean;
}

export interface DecksState {
  [title: string]: Card[];
}

export const initialState: DecksState = {};

export default function decks(state = initialState, action) {
  return state;
}
