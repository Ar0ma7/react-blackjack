import { Paper } from '@mui/material';
import { memo } from 'react';
import { styles } from './Card.css';
import { Card as CardType } from '@/types/index';

type Props = CardType;

export const Card = memo(({ suite, number, isFront }: Props) => {
  return (
    <Paper elevation={4} css={styles.card}>
      {isFront && `${suite}${number}`}
    </Paper>
  );
});
Card.displayName = 'Card';
