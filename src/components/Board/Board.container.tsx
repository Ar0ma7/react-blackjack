import { Board } from './Board';
import { useStore } from '@/store';

export const BoardContainer = () => {
  const { hand } = useStore();

  return <Board hand={hand} />;
};
