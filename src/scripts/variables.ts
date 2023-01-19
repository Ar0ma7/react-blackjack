import { PlayerAction, Suit } from '@/types/global'

export const SUIT: { [SUIT: string]: Suit } = {
  SPADES: 'S',
  CLUBS: 'C',
  DIAMONDS: 'D',
  HEARTS: 'H',
}

export const ACTION: { [ACTION: string]: PlayerAction } = {
  STAND: 'Stand',
  HIT: 'Hit',
  DOUBLE: 'Double',
  INSURANCE: 'Insurance',
  SPLIT: 'Split',
}
