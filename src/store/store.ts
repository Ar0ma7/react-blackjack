import { create } from 'zustand';
import { Store } from './type';
import { getInitialDeck } from '@/utills/getInitialDeck';
import { getRandomInt } from '@/utills/getRandomInt';

export const useStore = create<Store>((set) => ({
  deck: getInitialDeck(),
  draw: () =>
    set(({ deck }) => {
      const randomIndex = getRandomInt(deck.length);
      const newDeck = deck.filter((_, index) => index !== randomIndex);
      return { deck: newDeck };
    }),
  reset: () => set(() => ({ deck: getInitialDeck() })),
}));
