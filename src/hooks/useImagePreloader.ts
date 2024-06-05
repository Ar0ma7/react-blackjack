import { useEffect, useState } from 'react';
import { getInitialDeck } from '@/utils/getInitialDeck';

const imagePathList = [
  ...getInitialDeck(1).map(
    ({ suite, number }) =>
      `/image/card_${suite}_${`${number}`.padStart(2, '0')}.png`
  ),
  '/image/card_back.png',
];

const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = img.onabort = () => {
      reject(src);
    };
    img.src = src;
  });
};

export const useImagePreloader = () => {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const imagesPromiseList: Promise<any>[] = [];
      for (const i of imagePathList) {
        imagesPromiseList.push(preloadImage(i));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { imagesPreloaded };
};
