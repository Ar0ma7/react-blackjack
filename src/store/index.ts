import { create } from 'zustand';
import { cardSlice } from './slices/cardSlice';
import { Store } from './type';

export const useStore = create<Store>((...props) => ({
  ...cardSlice(...props),
}));
