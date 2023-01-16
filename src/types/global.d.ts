export type Suit = 'S' | 'C' | 'D' | 'H'

export type Card = {
  num: number
  suit: Suit
}

export type Deck = Card[]
