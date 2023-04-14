import { LOADING_STATE } from "../constants/Constants";

export interface PathOfExileState {
  value: number;
  currencyStatus: LOADING_STATE;
  currency: Currency;
}

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

export interface TradeSearchResponse {
  id: string;
  result: string[];
  total: number;
}
