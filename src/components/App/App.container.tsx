import useLocalStorage from '@rehooks/local-storage';
import { useCallback, useEffect, useState } from 'react';
import App from './App';
import { LOCAL_STORAGE_KEY, ROLE } from '@/constants';
import { useHitOperation } from '@/hooks/useHitOperation';
import { useStandOperation } from '@/hooks/useStandOperation';
import { useStore } from '@/store';
import { sleep } from '@/utills/timer';

export const AppContainer = () => {
  const { winner, gold, bet, startFlag, draw, replace, reset } = useStore();
  const stand = useStandOperation();
  const hit = useHitOperation();
  const [localStorageGold, setLocalStorageGold] = useLocalStorage<number>(
    LOCAL_STORAGE_KEY.GOLD
  );
  const [isShowNotice, setIsShowNotice] = useState(false);

  const setInitialGold = useCallback(() => {
    if (!localStorageGold || localStorageGold < 100) {
      setLocalStorageGold(gold);
    } else {
      replace({ gold: localStorageGold });
    }
  }, [gold, localStorageGold, replace, setLocalStorageGold]);

  const setInitialHand = useCallback(() => {
    draw(ROLE.PLAYER);
    draw(ROLE.PLAYER);
    draw(ROLE.DEALER);
    draw(ROLE.DEALER, false);
  }, [draw]);

  const handleClickStart = useCallback(() => {
    replace({ startFlag: true, gold: gold - bet });
    setInitialHand();
  }, [bet, gold, replace, setInitialHand]);

  const handleChangeSlider = useCallback(
    (bet: number) => {
      replace({ bet });
    },
    [replace]
  );

  const noticeWinner = useCallback(async () => {
    if (winner !== undefined) {
      setIsShowNotice(true);
      let total = gold;
      if (winner === ROLE.PLAYER) {
        total += bet * 2;
      } else if (winner === 'draw') {
        total += bet;
      }
      replace({ gold: total });
      setLocalStorageGold(total);
    }
    await sleep(3000);
    setIsShowNotice(false);
  }, [bet, gold, replace, setLocalStorageGold, winner]);

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
      isShowNotice={isShowNotice}
      onClickStart={handleClickStart}
      onChangeSlider={handleChangeSlider}
      onCloseNotice={() => setIsShowNotice(false)}
      onClickHit={hit}
      onClickStand={stand}
      onClickReset={handleClickReset}
    />
  );
};
