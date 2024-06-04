import { Deck, Hand, Role, Winner } from '@/types';

export type State = {
  deck: Deck;
  hand: Hand;
  winner: Winner;
  gold: number;
  startFlag: boolean;
};

export type Action = {
  draw: (role: Role, isFront?: boolean) => void;
  openDealerHand: () => void;
  replace: (someState: Partial<State>) => void;
  reset: () => void;
};

export type Store = State & Action;
