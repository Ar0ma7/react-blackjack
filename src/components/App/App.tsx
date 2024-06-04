import { Button, ButtonGroup, Slider, Snackbar } from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { BoardContainer } from '../Board';
import { styles } from './App.css';
import { State } from '@/store/type';
import { capitalizeFirstLetter } from '@/utills/stringUtill';

type Props = Pick<State, 'gold' | 'bet' | 'winner' | 'startFlag'> & {
  isShowNotice: boolean;
  onClickStart: () => void;
  onChangeSlider: (value: number) => void;
  onCloseNotice: () => void;
  onClickHit: () => void;
  onClickStand: () => void;
};

export const App = memo(
  ({
    winner,
    gold,
    bet,
    startFlag,
    isShowNotice,
    onClickStart,
    onChangeSlider,
    onCloseNotice,
    onClickHit,
    onClickStand,
  }: Props) => {
    const [disabled, setDisabled] = useState(false);

    const message = useMemo<string>(() => {
      if (winner === 'draw') {
        return winner;
      }
      if (winner) {
        return `${capitalizeFirstLetter(winner)} Win!`;
      }
      return '';
    }, [winner]);

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
            <div css={[styles.label, styles.startViewItem('GoldLabel')]}>
              GOLD:
            </div>
            <div css={styles.startViewItem('Gold')}>{gold}</div>
            <div css={[styles.label, styles.startViewItem('SliderLabel')]}>
              BET:
            </div>
            <Slider
              css={styles.startViewItem('Slider')}
              value={bet}
              step={100}
              min={100}
              max={gold}
              valueLabelDisplay="on"
              disabled={disabled}
              onChange={(_, value) => {
                onChangeSlider(value as number);
              }}
            />
            <div css={styles.startViewItem('StartButton')}>
              <Button variant="contained" size="large" onClick={onClickStart}>
                Start
              </Button>
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
              css={{ marginTop: '10px' }}
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

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isShowNotice}
          onClose={onCloseNotice}
          message={message}
        />
      </div>
    );
  }
);
App.displayName = 'App';

export default App;
