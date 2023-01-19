import React from 'react'
import { Card as CardType, Deck } from '@/types/global'
import styled from '@emotion/styled'
import { Card } from '@/components/Card'
import { Button } from 'react-bootstrap'
import { PlayerAction, PlayerActionProps } from '@/components/PlayerAction'

export type BoardProps = {
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

export const Board: React.FC<BoardProps> = React.memo(({ deck, player, dealer, onClickDeal }) => {
  return (
    <StyledBoard>
      <HandBox>
        {!!dealer.hand.length &&
          dealer.hand.map((card, index) => <StyledCard key={index} {...{ card }} />)}
      </HandBox>
      <HandBox>
        {!!player.hand.length &&
          player.hand.map((card, index) => <StyledCard key={index} {...{ card }} />)}
      </HandBox>
      <Button variant='primary' onClick={onClickDeal}>
        Deal
      </Button>
      <PlayerAction displayActionList={[]} onClickAction={() => {}} />
    </StyledBoard>
  )
})
Board.displayName = `Board`

const StyledBoard = styled.div`
  background: green;
  height: 100vh;
`

const HandBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledCard = styled(Card)`
  margin-left: -20;
`
