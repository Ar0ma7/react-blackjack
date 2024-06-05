import { memo } from 'react';
import { styles } from './Card.css';
import { images } from './image';
import { Card as CardType } from '@/types/index';

type Props = CardType;

export const Card = memo(({ suite, number, isFront }: Props) => {
  const visibleImage = isFront
    ? `card_${suite}_${`${number}`.padStart(2, '0')}`
    : 'card_back';
  const image = images(visibleImage);

  return <div css={styles.card}>{image.map((image) => image)}</div>;
});
Card.displayName = 'Card';
