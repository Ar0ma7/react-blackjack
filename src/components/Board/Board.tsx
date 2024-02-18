import { styles } from './Board.css';
import { Card } from '@/components/Card';

export const Board = () => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.playerBoard('dealerArea')}>
        <Card suite="CLUB" number={1} isFront />
        <Card suite="CLUB" number={1} isFront />
      </div>
      <div css={styles.playerBoard('playerArea')}>
        <Card suite="CLUB" number={1} isFront />
        <Card suite="CLUB" number={1} isFront />
      </div>
    </div>
  );
};
