import React from 'react'
import { PlayerAction as PlayerActionType } from '@/types/global'
import styled from '@emotion/styled'
import { Button } from 'react-bootstrap'

export type PlayerActionProps = {
  displayActionList: PlayerActionType[]
  onClickAction: (actionType: PlayerActionType) => void
}

export const PlayerAction: React.FC<PlayerActionProps> = React.memo(
  ({ displayActionList, onClickAction }) => {
    return (
      <ButtonOuter>
        {!!displayActionList.length &&
          displayActionList.map((actionType, index) => (
            <StyledButton key={index} variant='primary' onClick={() => onClickAction(actionType)}>
              {actionType}
            </StyledButton>
          ))}
      </ButtonOuter>
    )
  },
)
PlayerAction.displayName = `PlayerAction`

const ButtonOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledButton = styled(Button)`
  display: block;
  margin: 0 10px;
`
