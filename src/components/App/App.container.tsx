import { useEffect } from 'react';
import App from './App';
import { ROLE } from '@/constants';
import { useStore } from '@/store';

export const AppContainer = () => {
  const { draw, reset } = useStore();

  const setInitialHand = () => {
    draw(ROLE.PLAYER);
    draw(ROLE.PLAYER);
    draw(ROLE.DEALER);
    draw(ROLE.DEALER);
  };

  // on mounted
  useEffect(() => {
    setInitialHand();
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <App />;
};
