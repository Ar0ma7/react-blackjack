import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDecideWinner } from './useDecideWinner';
import { useGetSumHand } from './useGetSumHand';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const useStandOperation = () => {
  const { draw, openDealerHand } = useStore();

  const sumHand = useGetSumHand();
  const { decideWinner } = useDecideWinner();

  const [looping, setLooping] = useState(false);

  const isUnder17 = useMemo<boolean>(
    () =>
      !sumHand.dealer.length ? false : sumHand.dealer.every((sum) => sum < 17),
    [sumHand.dealer]
  );

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (looping) {
      intervalId = setInterval(() => {
        if (isUnder17) {
          draw(ROLE.DEALER);
        } else {
          setLooping(false);
          decideWinner();
        }
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [decideWinner, draw, isUnder17, looping, sumHand.dealer]);

  return useCallback(() => {
    openDealerHand();
    setLooping(true);
  }, [openDealerHand]);
};
