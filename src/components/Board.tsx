import React from 'react'
import { Card as CardType, Deck } from '@/types/global'
import styled from '@emotion/styled'
import { Card } from '@/components/Card'
import { Button } from 'react-bootstrap'
import { PlayerAction, PlayerActionProps } from '@/components/PlayerAction'
import { css } from '@emotion/react'

export type BoardProps = {
  isInGame: boolean
  deck: Deck
  player: {
    hand: CardType[]
    sum: number
  }
  dealer: {
    hand: CardType[]
    sum: number
  }
  onClickDeal: () => void
} & PlayerActionProps

export const Board: React.FC<BoardProps> = React.memo(
  ({ isInGame, deck, player, dealer, displayActionList, onClickDeal, onClickAction }) => {
    return (
      <StyledBoard>
        <div>
          <HandBox>
            {!!dealer.hand.length &&
              dealer.hand.map((card, index) => (
                <CardWrapper key={index}>
                  <Card {...{ card }} />
                </CardWrapper>
              ))}
          </HandBox>
          <Sum>{dealer.sum}</Sum>
        </div>
        <div>
          <Sum>{player.sum}</Sum>
          <HandBox>
            {!!player.hand.length &&
              player.hand.map((card, index) => (
                <CardWrapper key={index}>
                  <Card {...{ card }} />
                </CardWrapper>
              ))}
          </HandBox>
        </div>
        {!isInGame && (
          <Button variant='primary' onClick={onClickDeal}>
            Deal
          </Button>
        )}
        <PlayerAction {...{ displayActionList, onClickAction }} />
      </StyledBoard>
    )
  },
)
Board.displayName = `Board`

const StyledBoard = styled.div`
  background: green;
  height: 100vh;
`

const Sum = styled.div`
  margin: 0 auto;
  text-align: center;
`

const HandBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CardWrapper = styled.div`
  &:not(:first-child) {
    margin-left: -60px;
  }
`
