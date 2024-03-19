import { Paper } from '@mui/material';
import { memo } from 'react';
import { styles } from './Card.css';
import { Card as CardType } from '@/types/index';

type Props = CardType & {
  isFront: boolean;
};

export const Card = memo(({ suite, number }: Props) => {
  return (
    <Paper elevation={4} css={styles.card}>
      {suite}
      {number}
    </Paper>
  );
});
Card.displayName = 'Card';
