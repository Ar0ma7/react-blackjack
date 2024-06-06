import useLocalStorage from '@rehooks/local-storage';
import { useCallback, useEffect } from 'react';
import App from './App';
import { LOCAL_STORAGE_KEY, ROLE } from '@/constants';
import { useHitOperation } from '@/hooks/useHitOperation';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { useStandOperation } from '@/hooks/useStandOperation';
import { initialState, useStore } from '@/store';
import { sleep } from '@/utils/timer';

export const AppContainer = () => {
  useImagePreloader();
  const { winner, gold, bet, startFlag, draw, update, reset } = useStore();
  const stand = useStandOperation();
  const hit = useHitOperation();
  const [localStorageGold, setLocalStorageGold] = useLocalStorage<number>(
    LOCAL_STORAGE_KEY.GOLD
  );

  const setInitialGold = useCallback(() => {
    if (!localStorageGold || localStorageGold < 100) {
      setLocalStorageGold(gold);
    } else {
      update({ gold: localStorageGold });
    }
  }, [gold, localStorageGold, setLocalStorageGold, update]);

  const setInitialHand = useCallback(() => {
    draw(ROLE.PLAYER);
    draw(ROLE.PLAYER);
    draw(ROLE.DEALER);
    draw(ROLE.DEALER, false);
  }, [draw]);

  const handleClickStart = useCallback(() => {
    update({ startFlag: true, gold: gold - bet });
    setInitialHand();
  }, [bet, gold, setInitialHand, update]);

  const handleChangeSlider = useCallback(
    (bet: number) => {
      update({ bet });
    },
    [update]
  );

  const noticeWinner = useCallback(async () => {
    if (winner !== undefined) {
      update({ isShowNotice: true });
      let total = gold;
      if (winner === ROLE.PLAYER) {
        total += bet * 2;
      } else if (winner === 'draw') {
        total += bet;
      }
      update({ gold: total });
      setLocalStorageGold(total);
    }
    await sleep(3000);
    update({ isShowNotice: false });
  }, [bet, gold, setLocalStorageGold, update, winner]);

  const readyForNextGame = useCallback(async () => {
    const { hand, winner, startFlag, isShowNotice } = initialState;

    await noticeWinner();

    update({
      hand,
      winner,
      startFlag,
      isShowNotice,
    });
  }, [noticeWinner, update]);

  const handleClickReset = useCallback(() => {
    reset();
  }, [reset]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  return (
    <App
      winner={winner}
      gold={gold}
      bet={bet}
      startFlag={startFlag}
      onClickStart={handleClickStart}
      onChangeSlider={handleChangeSlider}
      onClickHit={hit}
      onClickStand={stand}
      onClickReset={handleClickReset}
    />
  );
};
