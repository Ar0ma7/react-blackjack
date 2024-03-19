import { useCallback, useEffect } from 'react';
import App from './App';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const AppContainer = () => {
  const { draw, reset } = useStore();

  const setInitialHand = useCallback(() => {
    draw(ROLE.PLAYER);
    draw(ROLE.PLAYER);
    draw(ROLE.DEALER);
    draw(ROLE.DEALER);
  }, [draw]);

  const handleClickHit = useCallback(() => {
    draw(ROLE.PLAYER);
  }, [draw]);

  const handleClickStand = useCallback(() => {}, []);

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
