import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import decks from './decs/reducer';

const middleware: Middleware[] = [];

const rootReducer = combineReducers({
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
