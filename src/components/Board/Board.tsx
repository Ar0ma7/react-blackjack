import { memo } from 'react';
import { styles } from './Board.css';
import { Card } from '@/components/Card';
import { SumHand } from '@/hooks/useGetSumHand';
import { State } from '@/store/type';

type Props = Pick<State, 'hand' | 'startFlag'> & {
  sumHand: SumHand;
};

export const Board = memo(({ hand, startFlag, sumHand }: Props) => {
  const { player, dealer } = sumHand;
  return (
    <div css={styles.wrapper}>
      {startFlag && (
        <>
          <div css={styles.playerBoard('dealerArea')}>
            {hand.dealer.map(({ suite, number, isFront }, index) => (
              <Card
                key={index}
                suite={suite}
                number={number}
                isFront={isFront}
              />
            ))}
          </div>

          <div css={styles.centerBoard}>
            <div>{dealer.join(' / ')}</div>
            <div>{player.join(' / ')}</div>
          </div>

          <div css={styles.playerBoard('playerArea')}>
            {hand.player.map(({ suite, number, isFront }, index) => (
              <Card
                key={index}
                suite={suite}
                number={number}
                isFront={isFront}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
Board.displayName = 'Board';
