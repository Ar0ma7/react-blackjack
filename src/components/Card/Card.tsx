import { memo } from 'react';
import { styles } from './Card.css';
import { image } from './image';
import { Card as CardType } from '@/types/index';

type Props = CardType;

export const Card = memo(({ suite, number, isFront }: Props) => {
  const imgSrc = isFront
    ? image[`card_${suite}_${`${number}`.padStart(2, '0')}`]
    : image.card_back;

  return (
    <div css={styles.card}>
      <img src={imgSrc} alt="" css={styles.image} />
    </div>
  );
});
Card.displayName = 'Card';
