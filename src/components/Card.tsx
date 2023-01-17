import React from 'react'
import { Card as CardType } from '@/types/global'
import styled from '@emotion/styled'

export type CardProps = {
  card: CardType
}

export const Card: React.FC<CardProps> = React.memo(({ card }) => {
  return (
    <StyledCard>
      {card.num}, {card.suit}
    </StyledCard>
  )
})
Card.displayName = `Card`

const StyledCard = styled.div`
  border: 1px solid #000;
  border-radius: 10px;
  width: 130px;
  height: 200px;
`
