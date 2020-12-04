import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import * as R from 'ramda';
import { deleteDeck } from '../redux/actions';
import { selectDecks } from '../redux/seclectors';

const useDecks = () => {
  const decks = useSelector(selectDecks);
  const dispatch = useDispatch();
  const [decksIds, setDecksIds] = useState(Object.keys(decks));

  const handleAddDeck = useCallback(() => {
    if (decksIds.length > Object.keys(decks).length) {
      return;
    }
    setDecksIds([...decksIds, `${Date.now()}`]);
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
