import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import * as R from 'ramda';
import { RootState } from '../../../config/store';
import { deleteDeck } from '../redux/actions';

const useDecks = () => {
  const { decks } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [decksIds, setDecksIds] = useState(Object.keys(decks));

  const handleAddDeck = useCallback(() => {
    if (decksIds.length > Object.keys(decks).length) {
      return;
    }
    setDecksIds([...decksIds, `${decksIds.length + 1}`]);
  }, [decksIds, decks]);

  const handleRemoveDeck = (item: string) => () => {
    dispatch(deleteDeck(item));
    setDecksIds(R.without([item], decksIds));
  };

  return {
    decks,
    decksIds,
    handleAddDeck,
    handleRemoveDeck,
  };
};

export default useDecks;
