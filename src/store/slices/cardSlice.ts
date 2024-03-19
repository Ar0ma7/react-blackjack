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
  draw: (role: Role, isFront?: boolean) => void;
  openDealerHand: () => void;
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
  draw: (role, isFront = true) => {
    const { deck, hand } = get();
    const randomIndex = getRandomInt(deck.length);
    const drawCard = deck.find((_, index) => index === randomIndex)!;
    const drawnDeck = deck.filter((_, index) => index !== randomIndex);

    let newHand = { ...hand };
    if (role === ROLE.DEALER) {
      newHand = {
        ...hand,
        dealer: [...hand.dealer, { ...drawCard, isFront }],
      };
    } else if (role === ROLE.PLAYER) {
      newHand = {
        ...hand,
        player: [...hand.player, { ...drawCard, isFront }],
      };
    }

    set({ deck: drawnDeck, hand: newHand });
  },
  openDealerHand: () => {
    const dealerHand = get().hand.dealer;
    const newHand = dealerHand.map((params) => ({
      ...params,
      isFront: true,
    }));

    set((prev) => ({
      ...prev,
      hand: {
        ...prev.hand,
        dealer: newHand,
      },
    }));
  },
  reset: () => set(initialState),
});
