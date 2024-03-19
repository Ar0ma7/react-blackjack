import { useCallback } from 'react';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const useHitOperation = () => {
  const { draw } = useStore();
  return useCallback(() => {
    draw(ROLE.PLAYER);
  }, [draw]);
};
