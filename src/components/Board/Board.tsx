import { memo } from 'react';
import { styles } from './Board.css';
import { Card } from '@/components/Card';
import { SumHand } from '@/hooks/useGetSumHand';
import { Hand } from '@/types';

type Props = {
  hand: Hand;
  sumHand: SumHand;
};

export const Board = memo(({ hand, sumHand }: Props) => {
  const { player, dealer } = sumHand;
  return (
    <div css={styles.wrapper}>
      <div css={styles.playerBoard('dealerArea')}>
        {hand.dealer.map(({ suite, number }, index) => (
          <Card key={index} suite={suite} number={number} isFront />
        ))}
      </div>
      <div css={styles.centerBoard}>
        <div>{dealer.join(' / ')}</div>
        <div>{player.join(' / ')}</div>
      </div>
      <div css={styles.playerBoard('playerArea')}>
        {hand.player.map(({ suite, number }, index) => (
          <Card key={index} suite={suite} number={number} isFront />
        ))}
      </div>
    </div>
  );
});
Board.displayName = 'Board';
