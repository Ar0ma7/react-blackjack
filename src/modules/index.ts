import { configureStore, createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const testInitialState = {}

export const testSlice = createSlice({
  name: 'test',
  initialState: testInitialState,
  reducers: {},
})

export const store = configureStore({
  reducer: {
    init: testSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
