import { ShopActions, ShopActionsTypes } from './interface';

type ProductType =
  | 'one_unlimited_deck'
  | 'three_unlimited_decks'
  | 'remove_ads'
  | 'monthly_subscription'
  | 'yearly_subscription';

interface Product {
  date: number;
  expire_at: string | null;
}

export type ShopState = {
  [key in ProductType]?: Product;
};

const initialState: ShopState = {};

export const shop = (state = initialState, action: ShopActions): ShopState => {
  switch (action.type) {
    case ShopActionsTypes.ONE_UNLIMITED_DECK:
    case ShopActionsTypes.THREE_UNLIMITED_DECKS:
    case ShopActionsTypes.REMOVE_ADS:
    case ShopActionsTypes.MONTHLY_SUBSCRIPTION:
    case ShopActionsTypes.YEARLY_SUBSCRIPTION: {
      return {
        ...state,
        [action.id]: { date: Date.now(), expire_at: null },
      };
    }
    default:
      return state;
  }
};
