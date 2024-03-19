import { useCallback } from 'react';
import { ROLE } from '@/constants';
import { useStore } from '@/store';
import { Role } from '@/types';

export const useGetSumHand = () => {
  const { hand: allHand } = useStore();

  const getSumHand = useCallback(
    (role: Role): number[] => {
      const hand = allHand[role];
      const handNumberList = hand.map(({ number }) => number);
      /**
       * 1 → 1
       * 10~13 → 10
       */
      const normalized = hand.map(({ number }) =>
        number >= 10 ? 10 : number
      ) as number[];
      const normalizedSum = normalized.reduce(
        (previous, current) => previous + current
      );

      if (handNumberList.includes(1)) {
        /**
         * 1 → 11
         * 10~13 → 10
         */
        const normalized11 = normalized.map((number) =>
          number === 1 ? 11 : number
        );
        const normalized11Sum = normalized11.reduce(
          (previous, current) => previous + current
        );

        // 1と11として計算した結果両方を返す
        return [normalizedSum, normalized11Sum];
      }

      return [normalizedSum];
    },
    [allHand]
  );

  return { player: getSumHand(ROLE.PLAYER), dealer: getSumHand(ROLE.DEALER) };
};
