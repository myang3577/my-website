import { fetchCorsProxy } from "../utils/Utils";
import { TRADE_SEARCH_URL } from "./PathOfExileConstants";
import { TradeSearchResponse } from "./PathOfExileTypes";

export const buildTradeFetchUrl = (tradeSearchResponseJson: TradeSearchResponse) => {
  const TRADE_FETCH_BASE_URL = "https://www.pathofexile.com/api/trade/fetch/";
  const resultString = tradeSearchResponseJson["result"].slice(-5).join(",");
  const queryId = tradeSearchResponseJson["id"];

  return `${TRADE_FETCH_BASE_URL}${resultString}?query=${queryId}`;
};

export const fetchPathOfExileTrade = async (query: unknown) => {
  const searchResponse = await fetchCorsProxy(TRADE_SEARCH_URL, {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const searchResponseJson = await searchResponse.json();
  console.log(searchResponseJson);

  const url = buildTradeFetchUrl(searchResponseJson);
  console.log(url);
  const tradeResponse = await fetchCorsProxy(url);
  const tradeResponseJson = await tradeResponse.json();
  console.log(tradeResponseJson);

  return tradeResponseJson;
};
