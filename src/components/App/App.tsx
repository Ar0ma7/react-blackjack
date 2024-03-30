import { Button, ButtonGroup, Slider, Snackbar } from '@mui/material';
import { memo, useMemo } from 'react';
import { BoardContainer } from '../Board';
import { styles } from './App.css';
import { Winner } from '@/types';
import { capitalizeFirstLetter } from '@/utills/stringUtill';

type Props = {
  winner: Winner;
  gold: number;
  isOpenNotice: boolean;
  handleChangeSlider: (value: number) => void;
  handleCloseNotice: () => void;
  handleClickHit: () => void;
  handleClickStand: () => void;
};

export const App = memo(
  ({
    winner,
    gold,
    isOpenNotice,
    handleChangeSlider,
    handleCloseNotice,
    handleClickHit,
    handleClickStand,
  }: Props) => {
    const message = useMemo<string>(() => {
      if (winner === 'draw') {
        return winner;
      }
      if (winner) {
        return `${capitalizeFirstLetter(winner)} Win!`;
      }
      return '';
    }, [winner]);

    return (
      <div css={styles.container}>
        <BoardContainer />

        <div css={styles.buttonWrapper}>
          <div css={styles.gold}>{gold}</div>
          <Slider
            defaultValue={1000}
            step={1000}
            max={10000}
            valueLabelDisplay="on"
            onChange={(_, value) => handleChangeSlider(value as number)}
          />
          <ButtonGroup orientation="vertical" variant="contained" size="large">
            <Button css={styles.button} onClick={handleClickHit}>
              Hit
            </Button>
            <Button css={styles.button} onClick={handleClickStand}>
              Stand
            </Button>
          </ButtonGroup>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isOpenNotice}
          onClose={handleCloseNotice}
          message={message}
        />
      </div>
    );
  }
);
App.displayName = 'App';

export default App;
