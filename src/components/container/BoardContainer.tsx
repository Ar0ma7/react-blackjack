import React, { useState } from 'react'
import { Card as CardType, PlayerAction } from '@/types/global'
import styled from '@emotion/styled'
import { Board } from '@/components/Board'
import { useAppDispatch, useAppSelector, AppDispatch, gameSlice } from '@/modules'
import { ACTION } from '@/scripts/variables'
import sleep from '@/scripts/sleep'

export const BoardContainer: React.FC = React.memo(() => {
  const dispatch: AppDispatch = useAppDispatch()
  const { toggleGame, draw, clearHand, setPlayerAction, playerAction } = gameSlice.actions
  const { isInGame, deck, player, dealer, displayActionList } = useAppSelector(
    (state) => state.default,
  )

  const onClickDeal = (): void => {
    dispatch(toggleGame(true))
    drawInitialHand()
  }

  const drawInitialHand = async () => {
    for (let index = 1; index <= 2; index++) {
      dispatch(draw('dealer'))
      dispatch(draw('player'))
    }
    dispatch(setPlayerAction())
  }

  const onClickAction = (action: PlayerAction): void => {
    dispatch(playerAction(action))
  }

  return (
    <Board {...{ isInGame, deck, player, dealer, displayActionList, onClickDeal, onClickAction }} />
  )
})
BoardContainer.displayName = `BoardContainer`
