import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import decks, { DecksState } from '../modules/DecksList/redux/reducer';

const middleware: Middleware[] = [];

export interface RootState {
  decks: DecksState;
}

const rootReducer = combineReducers<RootState>({
  decks,
});

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
