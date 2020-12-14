import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import decks, { DecksState } from '../modules/DecksList/redux/reducer';

const middleware: Middleware[] = [];

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export interface RootState {
  decks: DecksState;
}

const rootReducer = combineReducers<RootState>({
  decks,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  stateReconciler: autoMergeLevel2,
  version: 0,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);
// persistor.purge();

export { store, persistor };
