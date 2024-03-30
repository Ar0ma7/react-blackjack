import { useCallback, useEffect, useState } from 'react';
import App from './App';
import { ROLE } from '@/constants';
import { useHitOperation } from '@/hooks/useHitOperation';
import { useStandOperation } from '@/hooks/useStandOperation';
import { useStore } from '@/store';

export const AppContainer = () => {
  const { winner, draw, reset } = useStore();
  const stand = useStandOperation();
  const hit = useHitOperation();
  const [isOpenNotice, setOpenNotice] = useState(false);

  const setInitialHand = useCallback(() => {
    draw(ROLE.PLAYER);
    draw(ROLE.PLAYER);
    draw(ROLE.DEALER);
    draw(ROLE.DEALER, false);
  }, [draw]);

  const handleClickHit = useCallback(() => {
    hit();
  }, [hit]);

  const handleClickStand = useCallback(() => {
    stand();
  }, [stand]);

  const handleCloseNotice = useCallback(() => {
    setOpenNotice(false);
  }, []);

  // on mounted
  useEffect(() => {
    setInitialHand();
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
      isOpenNotice={isOpenNotice}
      handleCloseNotice={handleCloseNotice}
      handleClickHit={handleClickHit}
      handleClickStand={handleClickStand}
    />
  );
};
