import { memo } from 'react';
import { styles } from './Card.css';
import { Card as CardType } from '@/types/index';

type Props = CardType & {
  isFront: boolean;
};

export const Card = memo(({ suite, number }: Props) => {
  return (
    <div css={styles.card}>
      {suite}
      {number}
    </div>
  );
});
Card.displayName = 'Card';
