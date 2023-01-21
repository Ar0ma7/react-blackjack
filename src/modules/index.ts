import getDeck from '@/scripts/getDeck'
import { ACTION } from '@/scripts/variables'
import { Deck, Card, PlayerAction } from '@/types/global'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const initialState: {
  isInGame: boolean
  deck: Deck
  player: {
    hand: Card[]
    sum: number
  }
  dealer: {
    hand: Card[]
    sum: number
  }
  displayActionList: PlayerAction[]
} = {
  isInGame: false,
  deck: getDeck(),
  player: {
    hand: [],
    sum: 0,
  },
  dealer: {
    hand: [],
    sum: 0,
  },
  displayActionList: ['Stand', 'Hit', 'Double'],
}

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    toggleGame(state, action?: PayloadAction<boolean>) {
      if (action !== undefined) {
        state.isInGame = action.payload
      } else {
        state.isInGame = !state.isInGame
      }
    },
    draw(state, action: PayloadAction<'dealer' | 'player'>) {
      state[action.payload].hand.push(state.deck[0])
      let temp = 0
      state[action.payload].hand.forEach((card) => {
        temp += card.num >= 10 ? 10 : card.num
      })
      state[action.payload].sum = temp
      state.deck = state.deck.filter((_, index) => index !== 0)
    },
    clearHand(state) {
      state.dealer = {
        hand: [],
        sum: 0,
      }
      state.player = {
        hand: [],
        sum: 0,
      }
    },
    setPlayerAction(state) {
      if (state.dealer.hand[0].num === 1) {
        state.displayActionList = [...state.displayActionList, 'Insurance']
      }
      if (state.player.hand[0].num === state.player.hand[1].num) {
        state.displayActionList = [...state.displayActionList, 'Split']
      }
    },
    playerAction(state, action: PayloadAction<PlayerAction>) {
      // draw
      if ([ACTION.HIT, ACTION.DOUBLE].includes(action.payload)) {
        state.player.hand.push(state.deck[0])
        let temp = 0
        state.player.hand.forEach((card) => {
          temp += card.num >= 10 ? 10 : card.num
        })
        state.player.sum = temp
        state.deck = state.deck.filter((_, index) => index !== 0)
        state.displayActionList = ['Stand', 'Hit']
      }
      if (action.payload === ACTION.INSURANCE) {
        state.displayActionList = ['Stand', 'Hit']
      }
      // if (action.payload === ACTION.SPLIT) {
      // }
    },
  },
})

export const store = configureStore({
  reducer: {
    default: gameSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
