import { useCallback, useEffect, useState } from 'react';
import { useGetSumHand } from './useGetSumHand';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const useHitOperation = () => {
  const { winner, draw, replace } = useStore();
  const sumHand = useGetSumHand();
  const [hitCount, setHitCount] = useState(0);

  useEffect(() => {
    if (!sumHand.player.length) {
      replace({ winner: ROLE.DEALER });
    }
  }, [hitCount, replace, sumHand.player.length, winner]);

  return useCallback(() => {
    draw(ROLE.PLAYER);
    setHitCount((prev) => prev + 1);
  }, [draw]);
};
