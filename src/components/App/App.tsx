import { Button, ButtonGroup, Snackbar } from '@mui/material';
import { memo, useMemo } from 'react';
import { BoardContainer } from '../Board';
import { styles } from './App.css';
import { Winner } from '@/types';
import { capitalizeFirstLetter } from '@/utills/stringUtill';

type Props = {
  winner: Winner;
  isOpenNotice: boolean;
  handleCloseNotice: () => void;
  handleClickHit: () => void;
  handleClickStand: () => void;
};

export const App = memo(
  ({
    winner,
    isOpenNotice,
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
