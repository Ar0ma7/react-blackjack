import useLocalStorage from '@rehooks/local-storage';
import { useCallback, useEffect, useState } from 'react';
import App from './App';
import { LOCAL_STORAGE_KEY, ROLE } from '@/constants';
import { useHitOperation } from '@/hooks/useHitOperation';
import { useStandOperation } from '@/hooks/useStandOperation';
import { useStore } from '@/store';
import { sleep } from '@/utills/timer';

export const AppContainer = () => {
  const { winner, gold, startFlag, draw, replace, reset } = useStore();
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

  const handleClickStart = useCallback(() => {
    replace({ startFlag: true });
    setInitialHand();
  }, [replace, setInitialHand]);

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
      startFlag: false,
    });
  }, [noticeWinner, replace]);

  // on mounted
  useEffect(() => {
    setInitialGold();
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (winner) {
      readyForNextGame();
    }
  }, [readyForNextGame, winner]);

  return (
    <App
      winner={winner}
      gold={gold}
      startFlag={startFlag}
      isShowNotice={isShowNotice}
      onClickStart={handleClickStart}
      onChangeSlider={handleChangeSlider}
      onCloseNotice={() => setIsShowNotice(false)}
      onClickHit={hit}
      onClickStand={stand}
    />
  );
};
