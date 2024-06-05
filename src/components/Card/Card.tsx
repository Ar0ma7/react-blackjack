import { memo } from 'react';
import { styles } from './Card.css';
import { Card as CardType } from '@/types/index';
import { getInitialDeck } from '@/utils/getInitialDeck';

type Props = CardType;

const deck = getInitialDeck(1);

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

deck.map(({ suite, number }) => {
  preloadImage(`/image/card_${suite}_${`${number}`.padStart(2, '0')}.png`);
});
preloadImage('/image/card_back.png');

export const Card = memo(({ suite, number, isFront }: Props) => {
  const imgSrc = isFront
    ? `/image/card_${suite}_${`${number}`.padStart(2, '0')}.png`
    : '/image/card_back.png';

  return (
    <div css={styles.card}>
      <img src={imgSrc} alt="" css={styles.image} />
    </div>
  );
});
Card.displayName = 'Card';
