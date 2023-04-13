import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LOADING_STATE } from "../constants/Constants";
import { RootState } from "../store";

const CORS_PROXY = "https://corsproxy.io/?";

const CURRENCY_URL = `${CORS_PROXY}https://poe.ninja/api/data/currencyoverview?league=Crucible&type=Currency&language=en`;

export interface Currency {
  currencyTypeName: string;
  pay: PayReceive;
  receive: PayReceive;
}

export interface PayReceive {
  id: number;
  league_id: number;
  pay_currency_id: number;
  get_currency_id: number;
  sample_time_utc: string;
  count: number;
  value: number;
  data_point_count: number;
  includes_secondary: boolean;
  listing_count: number;
}

export interface PathOfExileState {
  value: number;
  currencyStatus: LOADING_STATE;
  currency: Currency;
}

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
  const response = await fetch(CURRENCY_URL);
  const responseJson = await response.json();

  return responseJson;
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
