import { create } from 'zustand';
import { State, Store } from './type';
import { ROLE } from '@/constants';
import { getInitialDeck } from '@/utills/getInitialDeck';
import { getRandomInt } from '@/utills/getRandomInt';

const initialState: State = {
  deck: getInitialDeck(),
  hand: {
    dealer: [],
    player: [],
  },
  winner: undefined,
  gold: 5000,
};

export const useStore = create<Store>((set, get) => ({
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
  replace: (someState: Partial<Store>) => set(someState),
  reset: () => set(initialState),
}));
