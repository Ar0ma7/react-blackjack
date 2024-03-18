import { memo } from 'react';
import { styles } from './Board.css';
import { Card } from '@/components/Card';
import { Hand } from '@/types';

type Props = {
  hand: Hand;
};

export const Board = memo(({ hand }: Props) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.playerBoard('dealerArea')}>
        {hand.dealer.map(({ suite, number }, index) => (
          <Card key={index} suite={suite} number={number} isFront />
        ))}
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
