import { Deck } from '@/types';

export type State = {
  deck: Deck;
};

export type Action = {
  draw: () => void;
  reset: () => void;
};

export type Store = State & Action;
