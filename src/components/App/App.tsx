import { Button, ButtonGroup, Link, Slider } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { BoardContainer } from '../Board';
import { styles } from './App.css';
import { State } from '@/store/type';

type Props = Pick<State, 'gold' | 'bet' | 'winner' | 'startFlag'> & {
  onClickStart: () => void;
  onChangeSlider: (value: number) => void;
  onClickHit: () => void;
  onClickStand: () => void;
  onClickReset: () => void;
};

export const App = memo(
  ({
    winner,
    gold,
    bet,
    startFlag,
    onClickStart,
    onChangeSlider,
    onClickHit,
    onClickStand,
    onClickReset,
  }: Props) => {
    const [disabled, setDisabled] = useState(false);
    const isAbleStart = gold >= 100;

    useEffect(() => {
      if (winner) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }, [winner]);

    return (
      <div css={styles.container}>
        <BoardContainer />

        {!startFlag && (
          <div css={styles.startView}>
            <div css={styles.title}>
              <img src="/image/logo.png" alt="" css={styles.logo} />
            </div>
            <div css={[styles.label, styles.startViewItem('GoldLabel')]}>
              GOLD:
            </div>
            <div css={styles.gold}>{gold}</div>
            <div css={[styles.label, styles.startViewItem('SliderLabel')]}>
              BET:
            </div>
            <Slider
              css={styles.startViewItem('Slider')}
              value={bet}
              step={100}
              min={100}
              max={gold}
              valueLabelDisplay={isAbleStart ? 'on' : 'off'}
              disabled={!isAbleStart}
              onChange={(_, value) => {
                onChangeSlider(value as number);
              }}
            />
            <div
              css={[
                styles.startViewItem('StartButton'),
                { textAlign: 'center' },
              ]}
            >
              <div>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onClickStart}
                  disabled={!isAbleStart}
                >
                  Start
                </Button>
              </div>

              {!isAbleStart && (
                <Link css={styles.reset} onClick={onClickReset}>
                  reset
                </Link>
              )}
            </div>
          </div>
        )}

        {startFlag && (
          <div css={styles.buttonWrapper}>
            <div css={styles.goldInfo}>
              <div>GOLD:</div>
              <div>{gold}</div>
              <div>BET:</div>
              <div>{bet}</div>
            </div>
            <ButtonGroup
              css={{ marginTop: '10px', background: '#777' }}
              disabled={disabled}
              orientation="vertical"
              variant="contained"
              size="large"
            >
              <Button css={styles.button} onClick={onClickHit}>
                Hit
              </Button>
              <Button
                css={styles.button}
                onClick={() => {
                  onClickStand();
                  setDisabled(true);
                }}
              >
                Stand
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    );
  }
);
App.displayName = 'App';

export default App;
