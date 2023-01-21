import { Deck, Suit } from '@/types/global'
import _ from 'lodash'
import { SUIT } from './variables'

const getDeck = (deckNum = 1): Deck => {
  const numbers: number[] = [...new Array(13)].map((_, index) => index + 1)
  const suits: Suit[] = Object.values(SUIT)
  const deck: Deck = numbers.map((num) => suits.map((suit) => ({ num, suit }))).flat(1)
  const combinedDeck: Deck = [...new Array(deckNum)].map((v) => _.shuffle(deck)).flat(1)
  return combinedDeck
}

export default getDeck
