import { Deck, Hand, Role, Winner } from '@/types';

export type State = {
  deck: Deck;
  hand: Hand;
  winner: Winner;
  gold: number;
  bet: number;
  startFlag: boolean;
  isShowNotice: boolean;
};

export type Action = {
  draw: (role: Role, isFront?: boolean) => void;
  openDealerHand: () => void;
  update: (someState: Partial<State>) => void;
  reset: () => void;
};

export type Store = State & Action;
