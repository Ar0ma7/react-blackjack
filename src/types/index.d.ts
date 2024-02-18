export type Suite = 'CLUB' | 'HEART' | 'SPADE' | 'DIA';
export type CardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type Card = {
  suite: Suite;
  number: CardNumber;
};
export type Deck = Card[];
