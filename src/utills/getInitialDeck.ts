import { Deck, Suite, CardNumber } from '@/types';

export const getInitialDeck = (deckNum: number = 2): Deck => {
  const deck: Deck = [];

  for (let index = 0; index < deckNum; index++) {
    const suites: Suite[] = ['CLUB', 'HEART', 'SPADE', 'DIA'];
    for (let index = 1; index <= 13; index++) {
      suites.forEach((suite) => {
        deck.push({
          number: index as CardNumber,
          suite,
          isFront: false,
        });
      });
    }
  }

  return deck;
};
