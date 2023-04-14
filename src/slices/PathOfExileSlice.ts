import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LOADING_STATE } from "../constants/Constants";
import { RootState } from "../store";
import { fetchCorsProxy } from "../utils/Utils";
import { CURRENCY_URL } from "./PathOfExileConstants";
import { PathOfExileState } from "./PathOfExileTypes";

const initialState: PathOfExileState = {
  value: 0,
  currencyStatus: LOADING_STATE.IDLE,
  currency: {
    currencyTypeName: "",
    pay: {
      id: 0,
      league_id: 0,
      pay_currency_id: 0,
      get_currency_id: 0,
      sample_time_utc: "",
      count: 0,
      value: 0,
      data_point_count: 0,
      includes_secondary: false,
      listing_count: 0,
    },
    receive: {
      id: 0,
      league_id: 0,
      pay_currency_id: 0,
      get_currency_id: 0,
      sample_time_utc: "",
      count: 0,
      value: 0,
      data_point_count: 0,
      includes_secondary: false,
      listing_count: 0,
    },
  },
};

/**
 * Fetch currency rates from poe.ninja API.
 */
export const fetchPathOfExileCurrency = createAsyncThunk("counter/fetchPathOfExileCurrency", async () => {
  const response = await fetchCorsProxy(CURRENCY_URL);
  return await response.json();
});

export const pathOfExileSlice = createSlice({
  name: "pathOfExile",
  initialState,
  reducers: {
    increment: (state: PathOfExileState) => {
      state.value += 1;
    },
    decrement: (state: PathOfExileState) => {
      state.value -= 1;
    },
    incrementByAmount: (state: PathOfExileState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPathOfExileCurrency.pending, (state) => {
        state.currencyStatus = LOADING_STATE.LOADING;
      })
      .addCase(fetchPathOfExileCurrency.fulfilled, (state, action) => {
        state.currencyStatus = LOADING_STATE.IDLE;
        state.currency = action.payload;
      })
      .addCase(fetchPathOfExileCurrency.rejected, (state) => {
        state.currencyStatus = LOADING_STATE.FAILED;
      });
  },
});

export const { increment, decrement, incrementByAmount } = pathOfExileSlice.actions;

export const selectPathOfExileCurrency = (state: RootState) => state.pathOfExile.currency;
export const selectPathOfExileCurrencyStatus = (state: RootState) => state.pathOfExile.currencyStatus;

export default pathOfExileSlice.reducer;
