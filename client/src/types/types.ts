export type Deck = {
  deck_id: string;
  remaining: number;
};

export type Card = {
  code: string;
  value: number;
  suit: string;
  image: string;
};
