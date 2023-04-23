import { LOADING_STATE } from "../../constants/Constants";
import { PoeNinjaCurrencyResult } from "./types/PoeNinjaCurrencyResult";
import { TradeFetchResult } from "./types/TradeFetchResult";

export interface PathOfExileState {
  value: number;
  currencyStatus: LOADING_STATE;
  currency: PoeNinjaCurrencyResult;
  averagePrices: { [name: string]: number };
}

export interface TradeSearchResponse {
  id: string;
  result: TradeFetchResult[];
  total: number;
}

export interface FetchTradeSearchPriceInput {
  itemName: string;
  tradeQuery: unknown;
  currency: PoeNinjaCurrencyResult;
}
