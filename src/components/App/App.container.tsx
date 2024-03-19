import { useCallback, useEffect } from 'react';
import App from './App';
import { ROLE } from '@/constants';
import { useHitOperation } from '@/hooks/useHitOperation';
import { useStandOperation } from '@/hooks/useStandOperation';
import { useStore } from '@/store';

export const AppContainer = () => {
  const { draw, reset } = useStore();
  const stand = useStandOperation();
  const hit = useHitOperation();

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

  // on mounted
  useEffect(() => {
    setInitialHand();
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <App handleClickHit={handleClickHit} handleClickStand={handleClickStand} />
  );
};
