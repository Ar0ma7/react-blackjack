import { useCallback, useEffect } from 'react';
import App from './App';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const AppContainer = () => {
  const { draw, openDealerHand, reset } = useStore();

  const setInitialHand = useCallback(() => {
    draw(ROLE.PLAYER);
    draw(ROLE.PLAYER);
    draw(ROLE.DEALER);
    draw(ROLE.DEALER, false);
  }, [draw]);

  const dealerTurn = useCallback(async () => {
    const interval = 2000;

    openDealerHand();

    setInterval(() => {
      draw(ROLE.DEALER);
    }, interval);
  }, [draw, openDealerHand]);

  const handleClickHit = useCallback(() => {
    draw(ROLE.PLAYER);
  }, [draw]);

  const handleClickStand = useCallback(() => {
    dealerTurn();
  }, [dealerTurn]);

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
