export interface PoeNinjaCurrencyResult {
  lines: Line[];
  currencyDetails: CurrencyDetail[];
  language: Language;
}

export interface CurrencyDetail {
  id: number;
  icon?: string;
  name: string;
  tradeId?: string;
}

export interface Language {
  name: string;
  translations: unknown;
}

export interface Line {
  currencyTypeName: string;
  pay?: PayReceive;
  receive?: PayReceive;
  paySparkLine: SparkLine;
  receiveSparkLine: SparkLine;
  chaosEquivalent: number;
  lowConfidencePaySparkLine: SparkLine;
  lowConfidenceReceiveSparkLine: LowConfidenceReceiveSparkLine;
  detailsId: string;
}

export interface SparkLine {
  data: Array<number | null>;
  totalChange: number;
}

export interface LowConfidenceReceiveSparkLine {
  data: number[];
  totalChange: number;
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
