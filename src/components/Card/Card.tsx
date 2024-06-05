import { memo, useEffect } from 'react';
import { styles } from './Card.css';
import { Card as CardType } from '@/types/index';

type Props = CardType;

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const Card = memo(({ suite, number, isFront }: Props) => {
  const imgSrc = isFront
    ? `/images/card_${suite}_${`${number}`.padStart(2, '0')}.png`
    : '/images/card_back.png';

  useEffect(() => {
    preloadImage(imgSrc);
  }, [imgSrc]);

  return (
    <div css={styles.card}>
      <img src={imgSrc} alt="" css={styles.image} loading="lazy" />
    </div>
  );
});
Card.displayName = 'Card';
