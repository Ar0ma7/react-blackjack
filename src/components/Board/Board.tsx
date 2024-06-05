import { memo, useMemo } from 'react';
import { styles } from './Board.css';
import { Card } from '@/components/Card';
import { SumHand } from '@/hooks/useGetSumHand';
import { State } from '@/store/type';
import { capitalizeFirstLetter } from '@/utils/stringUtil';

type Props = Pick<State, 'hand' | 'startFlag' | 'isShowNotice' | 'winner'> & {
  sumHand: SumHand;
};

export const Board = memo(
  ({ hand, startFlag, isShowNotice, sumHand, winner }: Props) => {
    const { player, dealer } = sumHand;
    const isOpenDealerHand = hand.dealer.every((card) => card.isFront);

    const noticeMessage = useMemo<string>(() => {
      if (winner === 'draw') {
        return winner;
      }
      if (winner) {
        return `${capitalizeFirstLetter(winner)} Win!`;
      }
      return '';
    }, [winner]);

    return (
      <div css={styles.wrapper}>
        {startFlag && (
          <>
            <div css={styles.playerBoard('DealerArea')}>
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
              <div css={styles.centerBoardInner}>
                <div css={styles.number}>
                  {isOpenDealerHand && (
                    <span>
                      {dealer[0]}
                      {dealer[1] && ` (${dealer[1]})`}
                    </span>
                  )}
                </div>

                <div css={styles.number}>
                  {player[0]}
                  {player[1] && ` (${player[1]})`}
                </div>
              </div>

              <div css={styles.noticeWinner(isShowNotice)}>{noticeMessage}</div>
            </div>

            <div css={styles.playerBoard('PlayerArea')}>
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
  }
);
Board.displayName = 'Board';
