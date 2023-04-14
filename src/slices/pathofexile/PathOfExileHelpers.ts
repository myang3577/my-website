import { fetchCorsProxy } from "../../utils/Utils";
import { TRADE_FETCH_BASE_URL, TRADE_SEARCH_URL } from "./PathOfExileConstants";
import { TradeSearchResponse } from "./PathOfExileTypes";
import { TradeFetchResult } from "./types/TradeFetchResult";

/**
 * Builds the URL for the trade fetch API. By default, appends the last 5 items in the result array and the query id to the end of the URL.
 *
 * Example: https://www.pathofexile.com/api/trade/fetch/1,2,3,4,5?query=1
 *
 * @param tradeSearchResponse The trade search response from the API.
 * @param startIndex The index to start from. Defaults to 0.
 * @param endIndex The index to end at. Defaults to 5.
 * @returns The URL to use for the trade fetch API.
 */
export const buildTradeFetchUrl = (tradeSearchResponse: TradeSearchResponse, startIndex = 0, endIndex = 5) => {
  const resultString = tradeSearchResponse["result"].slice(startIndex, endIndex).join(",");
  const queryId = tradeSearchResponse["id"];

  return `${TRADE_FETCH_BASE_URL}${resultString}?query=${queryId}`;
};

/**
 * Fetches the trade data from the API. By default gets the first 5 results.
 *
 * TODO: Add pagination.
 *
 * @param query The query to search for.
 * @returns The trade search response.
 */
export const fetchPathOfExileTrade = async (query: unknown): Promise<TradeFetchResult[]> => {
  const searchResponse = await fetchCorsProxy(TRADE_SEARCH_URL, {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const searchResponseJson = await searchResponse.json();
  const fetchUrl = buildTradeFetchUrl(searchResponseJson);

  const tradeResponse = await fetchCorsProxy(fetchUrl);
  const tradeResponseJson: TradeSearchResponse = await tradeResponse.json();

  return tradeResponseJson.result;
};
