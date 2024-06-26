import { Board } from './Board';
import { useGetSumHand } from '@/hooks/useGetSumHand';
import { useStore } from '@/store';

export const BoardContainer = () => {
  const { hand, startFlag, isShowNotice, winner } = useStore();
  const sumHand = useGetSumHand();

  return (
    <Board
      hand={hand}
      sumHand={sumHand}
      startFlag={startFlag}
      isShowNotice={isShowNotice}
      winner={winner}
    />
  );
};
