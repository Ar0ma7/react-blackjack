import { useCallback, useEffect, useState } from 'react';
import { useGetSumHand } from './useGetSumHand';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const useHitOperation = () => {
  const { draw, update } = useStore();
  const sumHand = useGetSumHand();
  // useEffect発火用
  const [hitCount, setHitCount] = useState(0);

  useEffect(() => {
    if (sumHand.player[0] > 21) {
      update({ winner: ROLE.DEALER });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitCount]);

  return useCallback(() => {
    draw(ROLE.PLAYER);
    setHitCount((prev) => prev + 1);
  }, [draw]);
};
