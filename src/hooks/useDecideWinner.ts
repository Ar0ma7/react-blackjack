import { useCallback } from 'react';
import { useGetSumHand } from './useGetSumHand';
import { ROLE } from '@/constants';
import { useStore } from '@/store';
import { Winner } from '@/types';

export const useDecideWinner = () => {
  const sumHand = useGetSumHand();
  const { replace } = useStore();

  const getMax = useCallback((hand: number[]): number => {
    return hand[1] <= 21 ? hand[1] : hand[0];
  }, []);

  const decideWinner = useCallback(() => {
    let winner: Winner = 'draw';

    const dealerNum = getMax(sumHand.dealer);
    const playerNum = getMax(sumHand.player);

    if (dealerNum <= 21 || playerNum <= 21) {
      if (dealerNum > playerNum) {
        winner = ROLE.DEALER;
      } else if (dealerNum < playerNum) {
        winner = ROLE.PLAYER;
      }
    } else {
      if (dealerNum <= 21 && playerNum > 21) {
        winner = ROLE.DEALER;
      }
      if (playerNum <= 21 && dealerNum > 21) {
        winner = ROLE.PLAYER;
      }
    }

    replace({
      winner,
    });
  }, [getMax, replace, sumHand.dealer, sumHand.player]);

  return { decideWinner };
};
