import { Button, ButtonGroup } from '@mui/material';
import { memo } from 'react';
import { BoardContainer } from '../Board';
import { styles } from './App.css';

type Props = {
  handleClickHit: () => void;
  handleClickStand: () => void;
};

export const App = memo(({ handleClickHit, handleClickStand }: Props) => {
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
    </div>
  );
});
App.displayName = 'App';

export default App;
