import { ROLE, SUITE } from '@/constants';
import { valueOf } from '@/utils/typeUtil';

export type Suite = valueOf<typeof SUITE>;

export type CardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type Card = {
  suite: Suite;
  number: CardNumber;
  isFront: boolean;
};

export type Deck = Card[];

export type Role = valueOf<typeof ROLE>;

export type Hand = {
  player: Card[];
  dealer: Card[];
};

export type Winner = Role | 'draw' | undefined;
