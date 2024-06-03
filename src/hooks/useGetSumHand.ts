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

      /** 1 → 1,  10~13 → 10 に正規化 */
      const normalized = hand.map(({ number }) =>
        number >= 10 ? 10 : number
      ) as number[];
      const normalizedSum = sum(normalized);

      sumList.push(normalizedSum);

      if (handNumberList.includes(1)) {
        /** 1 → 11,  10~13 → 10 */
        const normalized11 = normalized.map((number) =>
          number === 1 ? 11 : number
        );
        const normalized11Sum = sum(normalized11);

        // 11として計算して21を超えていなければ両方の合計を返す
        if (normalized11Sum <= 21) {
          sumList.push(normalized11Sum);
        }
      }

      return sumList;
    },
    [allHand]
  );

  return { player: getSumHand(ROLE.PLAYER), dealer: getSumHand(ROLE.DEALER) };
};
