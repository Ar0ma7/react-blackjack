import { getDeck } from '@/scripts/getDeck'
import { Deck, Card } from '@/types/global'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const initialState: {
  deck: Deck
  player: {
    hand: Card[]
    sum: number
  }
  dealer: {
    hand: Card[]
    sum: number
  }
} = {
  deck: getDeck(),
  player: {
    hand: [],
    sum: 0,
  },
  dealer: {
    hand: [],
    sum: 0,
  },
}

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
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
