import { getDeck } from '@/scripts/getDeck'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const initialState: {
  deck: {
    num: number
    suit: string
  }[]
} = {
  deck: getDeck(),
}

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    draw(state, action: PayloadAction<number>) {
      // 指定した数を先頭から削除
      state.deck = state.deck.filter((_, index) => index < action.payload)
    },
  },
})

export const store = configureStore({
  reducer: {
    default: slice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
