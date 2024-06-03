import useLocalStorage from '@rehooks/local-storage';
import { useCallback, useEffect, useState } from 'react';
import App from './App';
import { LOCAL_STORAGE_KEY, ROLE } from '@/constants';
import { useHitOperation } from '@/hooks/useHitOperation';
import { useStandOperation } from '@/hooks/useStandOperation';
import { useStore } from '@/store';
import { sleep } from '@/utills/timer';

export const AppContainer = () => {
  const { winner, gold, draw, replace, resetForNextGame, reset } = useStore();
  const stand = useStandOperation();
  const hit = useHitOperation();
  const [localStorageGold] = useLocalStorage<number>(LOCAL_STORAGE_KEY.GOLD);
  const [isShowNotice, setIsShowNotice] = useState(false);

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

  const handleChangeSlider = useCallback((value: number) => {
    console.log(value);
  }, []);

  const noticeWinner = useCallback(async () => {
    if (winner) {
      setIsShowNotice(true);
      await sleep(3000);
    }
    setIsShowNotice(false);
  }, [winner]);

  const readyForNextGame = useCallback(async () => {
    await noticeWinner();
    replace({
      hand: {
        dealer: [],
        player: [],
      },
      winner: undefined,
    });
    setInitialHand();
  }, [noticeWinner, replace, setInitialHand]);

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
    readyForNextGame();
  }, [readyForNextGame, winner]);

  return (
    <App
      winner={winner}
      gold={gold}
      isShowNotice={isShowNotice}
      handleChangeSlider={handleChangeSlider}
      handleCloseNotice={() => setIsShowNotice(false)}
      handleClickHit={hit}
      handleClickStand={stand}
    />
  );
};
