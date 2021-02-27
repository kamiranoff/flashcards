export enum ProductsIds {
  ONE_UNLIMITED_DECK = 'one_unlimited_deck',
  THREE_UNLIMITED_DECKS = 'three_unlimited_decks',
  REMOVE_ADS = 'remove_ads',
  MONTHLY_SUBSCRIPTION = 'monthly_subscription',
  YEARLY_SUBSCRIPTION = 'yearly_subscription',
}

export enum DecksToGive {
  ONE_UNLIMITED_DECK = 1,
  THREE_UNLIMITED_DECKS = 3,
}
export const itemSkus = [
  ProductsIds.ONE_UNLIMITED_DECK,
  ProductsIds.THREE_UNLIMITED_DECKS,
  ProductsIds.REMOVE_ADS,
  ProductsIds.MONTHLY_SUBSCRIPTION,
  ProductsIds.YEARLY_SUBSCRIPTION,
];

export const getNumberOfDecksToGive = (productId: string) => {
  switch (productId) {
    case ProductsIds.ONE_UNLIMITED_DECK:
      return DecksToGive.ONE_UNLIMITED_DECK;

    case ProductsIds.THREE_UNLIMITED_DECKS:
      return DecksToGive.THREE_UNLIMITED_DECKS;

    case ProductsIds.REMOVE_ADS:
      return 'remove_ads';
    case ProductsIds.MONTHLY_SUBSCRIPTION:
      return 'monthly_subscription';
    case ProductsIds.YEARLY_SUBSCRIPTION:
      return 'yearly_subscription';
    default:
      console.log('subscription');
      return null;
  }
};
