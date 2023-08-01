import { configureStore } from '@reduxjs/toolkit'
import indodaxReducer from './indodaxSlice'
import binanceReducer from './binanceSlice'

export const store = configureStore({
  reducer: {
    indodax: indodaxReducer,
    binance: binanceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})