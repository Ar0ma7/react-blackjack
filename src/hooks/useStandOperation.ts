import { useCallback, useEffect, useState } from 'react';
import { useGetSumHand } from './useGetSumHand';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const useStandOperation = () => {
  const { draw, openDealerHand } = useStore();
  const [looping, setLooping] = useState(false);
  const sumHand = useGetSumHand();

  useEffect(() => {
    let interval: number;
    if (looping) {
      interval = setInterval(() => {
        const isUnder17 = sumHand.dealer.every((sum) => sum < 17);
        if (isUnder17) {
          draw(ROLE.DEALER);
        } else {
          setLooping(false);
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [draw, looping, sumHand.dealer]);

  return useCallback(() => {
    openDealerHand();
    setLooping(true);
  }, [openDealerHand]);
};
