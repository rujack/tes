import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  binance: [],
}

export const binanceSlice = createSlice({
  name: 'binance',
  initialState,
  reducers: {
    updateBinance: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.data = [...state.data,action.payload]
      // console.log(action);
      state.binance.map((data, id) => {
        if (data.pair.toUpperCase() == action.payload.s) {
          // console.log(action.payload.ask[0])
          data.ask = action.payload.a;
          data.bid = action.payload.b;
        }
      });
    },
    add: (state, action) => {
      state.data.push({
        pair: 'nyar',
        ask: 0,
        bid: 0
      })
    },

  },
})

// Action creators are generated for each case reducer function
export const { add, updateBinance } = binanceSlice.actions

export default binanceSlice.reducer