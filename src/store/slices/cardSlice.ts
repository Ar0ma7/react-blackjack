import { StateCreator } from 'zustand';
import { ROLE } from '@/constants';
import { Deck, Hand, Role } from '@/types';
import { getInitialDeck } from '@/utills/getInitialDeck';
import { getRandomInt } from '@/utills/getRandomInt';

type State = {
  deck: Deck;
  hand: Hand;
};

type Action = {
  draw: (role: Role) => void;
  reset: () => void;
};

export type CardSlice = State & Action;

const initialState: State = {
  deck: getInitialDeck(),
  hand: {
    dealer: [],
    player: [],
  },
};

export const cardSlice: StateCreator<CardSlice> = (set, get) => ({
  ...initialState,
  draw: (role) => {
    const { deck, hand } = get();
    const randomIndex = getRandomInt(deck.length);
    const drawCard = deck.find((_, index) => index === randomIndex)!;
    const drawnDeck = deck.filter((_, index) => index !== randomIndex);

    let newHand = { ...hand };
    if (role === ROLE.DEALER) {
      newHand = {
        ...hand,
        dealer: [...hand.dealer, drawCard],
      };
    } else if (role === ROLE.PLAYER) {
      newHand = {
        ...hand,
        player: [...hand.player, drawCard],
      };
    }

    set({ deck: drawnDeck, hand: newHand });
  },
  reset: () => set(initialState),
});
