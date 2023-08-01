import {
  createSlice
} from '@reduxjs/toolkit'

const initialState = {
  harga: [],
}

export const indodaxSlice = createSlice({
  name: 'indodax',
  initialState,
  reducers: {
    updateIndodax: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.data = [...state.data,action.payload]
      // console.log(action);
      // for (let i in state.harga) {
      //   if (state.harga[i].pairIndodax == action.payload.pair) {
      //     // console.log(action.payload.ask[0])
      //     state.harga[i].indodax.ask = action.payload.ask[0].price;
      //     state.harga[i].indodax.bid = action.payload.bid[0].price;
      //     break;
      //   }
      // };
      state.harga.findIndex(koin => {
        if (koin.pairIndodax == action.payload.pair) {
              // console.log(action.payload.ask[0])
              koin.indodax.ask = action.payload.ask[0].price;
              koin.indodax.bid = action.payload.bid[0].price;
              // console.log(koin.pairIndodax)
            }
            localStorage.setItem("harga_koins", JSON.stringify(state.harga));
      })
    },

    updateBinance: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.data = [...state.data,action.payload]
      // console.log(action);
      // for (let i in state.harga) {
      //   if (state.harga[i].pairBinance.toUpperCase() == action.payload.s) {
      //     // console.log(action.payload.ask[0])
      //     state.harga[i].binance.ask = action.payload.a;
      //     state.harga[i].binance.bid = action.payload.b;
      //     break;
      //   }
      // };
      state.harga.findIndex(koin => {
        if (koin.pairBinance.toUpperCase() == action.payload.s) {
              koin.binance.ask = action.payload.a;
              koin.binance.bid = action.payload.b;
            }
      localStorage.setItem("harga_koins", JSON.stringify(state.harga));

      })
    },

    addIndodax: (state, action) => {
      state.harga=action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const {
  addIndodax,
  updateIndodax,updateBinance
} = indodaxSlice.actions

export default indodaxSlice.reducer