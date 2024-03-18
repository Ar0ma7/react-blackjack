import { useCallback } from 'react';
import { ROLE } from '@/constants';
import { useStore } from '@/store';
import { Role } from '@/types';

export const useGetSumHand = () => {
  const { hand: allHand } = useStore();

  const getSumHand = useCallback(
    (role: Role) => {
      const hand = allHand[role];
      const handNumberList = hand.map(({ number }) => number);

      if (
        hand.length === 2 &&
        handNumberList.includes(1) &&
        (handNumberList.includes(11) ||
          handNumberList.includes(12) ||
          handNumberList.includes(13))
      ) {
        return 11;
      }

      const normalized = hand.map(({ number }) => (number >= 10 ? 10 : number));

      return (normalized as number[]).reduce(
        (previous, current) => previous + current
      );
    },
    [allHand]
  );

  return { player: getSumHand(ROLE.PLAYER), dealer: getSumHand(ROLE.DEALER) };
};
