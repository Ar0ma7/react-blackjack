import { Button, ButtonGroup } from '@mui/material';
import { BoardContainer } from '../Board';
import { styles } from './App.css';

export const App = () => {
  return (
    <div css={styles.container}>
      <BoardContainer />
      <div css={styles.buttonWrapper}>
        <ButtonGroup orientation="vertical" variant="contained" size="large">
          <Button css={styles.button}>Hit</Button>
          <Button css={styles.button}>Stand</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default App;
