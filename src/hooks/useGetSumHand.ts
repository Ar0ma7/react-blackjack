import { useCallback } from 'react';
import { ROLE } from '@/constants';
import { useStore } from '@/store';
import { Role } from '@/types';
import { sum } from '@/utills/arrayUtill';

export type SumHand = {
  player: number[];
  dealer: number[];
};

/**
 * 各プレイヤーハンドの合計を返す
 */
export const useGetSumHand = (): SumHand => {
  const { hand: allHand } = useStore();

  const getSumHand = useCallback(
    (role: Role): number[] => {
      const hand = allHand[role];
      const handNumberList = hand.map(({ number }) => number);
      const sumList = [];

      /** ハード17に正規化 */
      const normalizeHard = hand.map(({ number }) =>
        number >= 10 ? 10 : number
      ) as number[];
      const normalizeHardSum = sum(normalizeHard);

      sumList.push(normalizeHardSum);

      if (handNumberList.includes(1)) {
        /** ソフト17に正規化 */
        const normalizeSoft = normalizeHard.map((number) =>
          number === 1 ? 11 : number
        );
        const normalizeSoftSum = sum(normalizeSoft);

        if (normalizeSoftSum <= 21) {
          sumList.push(normalizeSoftSum);
        }
      }

      return sumList;
    },
    [allHand]
  );

  return { player: getSumHand(ROLE.PLAYER), dealer: getSumHand(ROLE.DEALER) };
};
