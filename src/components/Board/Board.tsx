import { styles } from './Board.css';

export const Board = () => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.playerBoard('dealerArea')}></div>
      <div css={styles.playerBoard('playerArea')}></div>
    </div>
  );
};
