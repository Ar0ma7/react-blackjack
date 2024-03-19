import { useCallback } from 'react';
import { ROLE } from '@/constants';
import { useStore } from '@/store';
import { Role } from '@/types';

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
      /** 1 → 1,  10~13 → 10 */
      const normalized = hand.map(({ number }) =>
        number >= 10 ? 10 : number
      ) as number[];
      const normalizedSum = normalized.reduce(
        (previous, current) => previous + current,
        0
      );
      const sumList = [normalizedSum];

      if (handNumberList.includes(1)) {
        /** 1 → 11,  10~13 → 10 */
        const normalized11 = normalized.map((number) =>
          number === 1 ? 11 : number
        );
        const normalized11Sum = normalized11.reduce(
          (previous, current) => previous + current,
          0
        );

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
