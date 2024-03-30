import { useCallback, useEffect, useState } from 'react';
import { useDecideWinner } from './useDecideWinner';
import { useGetSumHand } from './useGetSumHand';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const useStandOperation = () => {
  const { draw, openDealerHand } = useStore();

  const sumHand = useGetSumHand();
  const { decideWinner } = useDecideWinner();

  const [looping, setLooping] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (looping) {
      intervalId = setInterval(() => {
        const isUnder17 = !sumHand.dealer.length
          ? false
          : sumHand.dealer.every((sum) => sum < 17);
        if (isUnder17) {
          draw(ROLE.DEALER);
        } else {
          setLooping(false);
          decideWinner();
        }
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [decideWinner, draw, looping, sumHand.dealer]);

  return useCallback(() => {
    openDealerHand();
    setLooping(true);
  }, [openDealerHand]);
};
