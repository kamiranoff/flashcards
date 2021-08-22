import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api, { CreateCardsResponse } from '../../../api';
import { GetDeckBySharedIdResponse } from '../../../api/types';
import { getDeckByShareIdError, updateDeck } from '../actions';
import { DecksActionTypes, GetDeckByShareId } from '../interface';
import { RootState } from '../../store';
import { Card, Deck } from '../reducer';

const addRank = (cards: { id: number }[], selectedDeck: Deck | null) => {
  return cards.map((c) => {
    const selectedCard = selectedDeck ? selectedDeck.cards.find((card: Card) => card.id === c.id) : null;
    return {
      ...c,
      rank: selectedCard?.rank ? selectedCard.rank : null,
    };
  });
};

function* getDeckByShareIdSaga({ code, deckId }: GetDeckByShareId) {
  const { decks, user }: { decks: RootState['decks']; user: RootState['user'] } = yield select(
    (state: RootState) => state,
  );
  const selectedDeck = deckId ? decks.decks[deckId] : null;
  try {
    const response: GetDeckBySharedIdResponse = yield call(Api.getSharedDeckBySharedId, code);
    if (!response.data) {
      throw new Error(response.error || 'Unknown error');
    }
    const id = deckId || response.data.deckId;
    if (response.data.shareId) {
      if (selectedDeck?.cards && selectedDeck?.cards.length > response.data.cards.length) {
        const localCardsOnly = selectedDeck.cards.filter((c) => {
          const remoteCard = response.data?.cards.find((rc) => rc.id === c.id);
          return !remoteCard;
        });
        // FIXME
        const createCardsResponse: CreateCardsResponse = yield call(
          // @ts-ignore
          Api.createCards,
          selectedDeck.deckId,
          localCardsOnly,
        );
        if ('error' in createCardsResponse) {
          throw new Error(createCardsResponse.error || 'Unknown error');
        }
        const mergedCards = selectedDeck.cards.map((c) => {
          const serverCard = createCardsResponse.cards.length
            ? createCardsResponse.cards.find((serverCard) => serverCard.frontendId === c.frontendId)
            : null;
          return {
            ...c,
            id: serverCard?.id,
          };
        });
        const deck = { ...selectedDeck, cards: mergedCards };
        return yield put(updateDeck(id.toString(), deck));
      }
      const cards = addRank(response.data?.cards || [], selectedDeck);
      const deck = {
        ...response.data,
        isOwner: user.sub === response.data.owner,
        sharedByYou: selectedDeck ? selectedDeck.owner : user.sub === response.data.owner,
        sharedWithYou: selectedDeck ? !selectedDeck.owner : user.sub !== response.data.owner,
        cards,
      };

      return yield put(updateDeck(id.toString(), deck));
    }
  } catch (error) {
    yield put(getDeckByShareIdError('Something went wrong'));
  }
}

export default function* watchGetDeckByShareId() {
  yield takeLatest(DecksActionTypes.getDeckByShareId, getDeckByShareIdSaga);
}
