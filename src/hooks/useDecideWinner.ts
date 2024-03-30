import { useCallback } from 'react';
import { useGetSumHand } from './useGetSumHand';
import { ROLE } from '@/constants';
import { useStore } from '@/store';
import { Winner } from '@/types';
import { max } from '@/utills/arrayUtill';

export const useDecideWinner = () => {
  const sumHand = useGetSumHand();
  const { replace } = useStore();

  const decideWinner = useCallback(() => {
    let winner: Winner = 'draw';
    if (!sumHand.dealer.length) {
      winner = ROLE.PLAYER;
    } else if (!sumHand.player.length) {
      winner = ROLE.DEALER;
    }

    const dealerNum = max(sumHand.dealer)!;
    const playerNum = max(sumHand.player)!;

    if (dealerNum > playerNum) {
      winner = ROLE.DEALER;
    } else if (dealerNum < playerNum) {
      winner = ROLE.PLAYER;
    }

    replace({ winner });
  }, [replace, sumHand.dealer, sumHand.player]);

  return { decideWinner };
};
