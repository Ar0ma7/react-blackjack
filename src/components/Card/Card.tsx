import { memo, useCallback, useEffect, useState } from 'react';
import { styles } from './Card.css';
import { Card as CardType } from '@/types/index';

type Props = CardType;

export const Card = memo(({ suite, number, isFront }: Props) => {
  const [imgSrc, setImgSrc] = useState('');

  const loadImage = useCallback(async () => {
    if (isFront) {
      const image = await import(
        `/images/card_${suite}_${`${number}`.padStart(2, '0')}.png`
      );
      setImgSrc(image.default);
    } else {
      const image = await import('/images/card_back.png');
      setImgSrc(image.default);
    }
  }, [isFront, number, suite]);

  useEffect(() => {
    loadImage();
  }, [suite, number, isFront, loadImage]);

  return (
    <div css={styles.card}>
      <img src={imgSrc} alt="" css={styles.image} />
    </div>
  );
});
Card.displayName = 'Card';
