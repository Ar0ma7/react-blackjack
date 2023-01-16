import { Deck, Suit } from '@/types/global'
import _ from 'lodash'
import { SUIT } from './variables'

export const getDeck = (deckNum = 8): Deck => {
  const numbers: number[] = [...new Array(13)].map((_, index) => index + 1)
  const suits: Suit[] = Object.values(SUIT)
  const deck: Deck = numbers.map((num) => suits.map((suit) => ({ num, suit }))).flat(1)
  const combinedDeck: Deck = [...new Array(deckNum)].map((_) => deck).flat(1)
  return _.shuffle(combinedDeck)
}
