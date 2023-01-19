import React from 'react'
import { Card as CardType, PlayerAction } from '@/types/global'
import styled from '@emotion/styled'
import { Board } from '@/components/Board'
import { useAppDispatch, useAppSelector, AppDispatch, gameSlice } from '@/modules'
import { ACTION } from '@/scripts/variables'

export const BoardContainer: React.FC = React.memo(() => {
  const dispatch: AppDispatch = useAppDispatch()
  const { toggleGame, draw, clearHand } = gameSlice.actions
  const { deck, player, dealer } = useAppSelector((state) => state.default)

  const onClickDeal = (): void => {
    dispatch(toggleGame(true))
  }

  const onClickAction = (action: PlayerAction): void => {
    switch (action) {
      case ACTION.STAND:
        dispatch(draw('player'))
        break
    }
  }
  return <Board {...{ deck, player, dealer, onClickDeal }} />
})
BoardContainer.displayName = `BoardContainer`
