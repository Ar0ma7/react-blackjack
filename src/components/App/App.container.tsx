import useLocalStorage from '@rehooks/local-storage';
import { useCallback, useEffect, useState } from 'react';
import App from './App';
import { LOCAL_STORAGE_KEY, ROLE } from '@/constants';
import { useHitOperation } from '@/hooks/useHitOperation';
import { useStandOperation } from '@/hooks/useStandOperation';
import { useStore } from '@/store';

export const AppContainer = () => {
  const { winner, gold, draw, replace, reset } = useStore();
  const stand = useStandOperation();
  const hit = useHitOperation();
  const [localStorageGold] = useLocalStorage<number>(LOCAL_STORAGE_KEY.GOLD);
  const [isOpenNotice, setOpenNotice] = useState(false);

  const setInitialHand = useCallback(() => {
    draw(ROLE.PLAYER);
    draw(ROLE.PLAYER);
    draw(ROLE.DEALER);
    draw(ROLE.DEALER, false);
  }, [draw]);

  const setInitialGold = useCallback(() => {
    if (localStorageGold) {
      replace({ gold: localStorageGold });
    }
  }, [localStorageGold, replace]);

  const handleClickHit = useCallback(() => {
    hit();
  }, [hit]);

  const handleClickStand = useCallback(() => {
    stand();
  }, [stand]);

  const handleCloseNotice = useCallback(() => {
    setOpenNotice(false);
  }, []);

  const handleChangeSlider = useCallback((value: number) => {
    console.log(value);
  }, []);

  // on mounted
  useEffect(() => {
    setInitialHand();
    setInitialGold();
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (winner) {
      setOpenNotice(true);
    }
  }, [winner]);

  return (
    <App
      winner={winner}
      gold={gold}
      isOpenNotice={isOpenNotice}
      handleChangeSlider={handleChangeSlider}
      handleCloseNotice={handleCloseNotice}
      handleClickHit={handleClickHit}
      handleClickStand={handleClickStand}
    />
  );
};
