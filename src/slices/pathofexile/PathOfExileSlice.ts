import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LOADING_STATE } from "../../constants/Constants";
import { RootState } from "../../store";
import { fetchCorsProxy } from "../../utils/Utils";
import { CURRENCY_URL } from "./PathOfExileConstants";
import { fetchPathOfExileTrade } from "./PathOfExileHelpers";
import { PathOfExileState } from "./PathOfExileTypes";
import { TradeFetchResult } from "./types/TradeFetchResult";

const initialState: PathOfExileState = {
  value: 0,
  currencyStatus: LOADING_STATE.IDLE,
  currency: {
    lines: [],
    currencyDetails: [],
    language: {
      name: "",
      translations: {},
    },
  },
};

/**
 * Fetch currency rates from poe.ninja API.
 */
export const fetchPathOfExileCurrency = createAsyncThunk("pathOfExile/fetchPathOfExileCurrency", async () => {
  const response = await fetchCorsProxy(CURRENCY_URL);
  const responseJson = await response.json();

  return responseJson;
});

/**
 * Fetch prices for the input trade search query.
 */
export const fetchPathOfExileTradeSearchPrice = createAsyncThunk(
  "pathOfExile/fetchPathOfExileTradeSearchPrice",
  async (query: unknown) => {
    const tradeSearchResults: TradeFetchResult[] = await fetchPathOfExileTrade(query);
    const prices = tradeSearchResults.map((tradeSearchResult: TradeFetchResult) => tradeSearchResult.listing.price);

    console.log(prices);

    // TODO: convert prices to c
  }
);

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
