import { memo } from 'react';
import { styles } from './Card.css';
import { Card as CardType } from '@/types/index';

type Props = CardType;

export const Card = memo(({ suite, number, isFront }: Props) => {
  const imgSrc = isFront
    ? `/images/card_${suite}_${`${number}`.padStart(2, '0')}.png`
    : '/images/card_back.png';

  return (
    <div css={styles.card}>
      <img src={imgSrc} alt="" css={styles.image} />
    </div>
  );
});
Card.displayName = 'Card';
