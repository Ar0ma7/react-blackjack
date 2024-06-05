import { memo, useEffect, useState } from 'react';
import { styles } from './Card.css';
import { image } from './image';
import { Card as CardType } from '@/types/index';

type Props = CardType;

export const Card = memo(({ suite, number, isFront }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imgSrc = isFront
    ? image[`card_${suite}_${`${number}`.padStart(2, '0')}`]
    : image.card_back;

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      setLoaded(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={styles.card}>
      {loaded && <img src={imgSrc} alt="" css={styles.image} />}
    </div>
  );
});
Card.displayName = 'Card';
