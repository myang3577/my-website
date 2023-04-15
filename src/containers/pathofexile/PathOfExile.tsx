import { Paper } from "@mui/material";
import { useEffect } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import {
  fetchPathOfExileCurrency,
  fetchPathOfExileTradeSearchPrice,
  selectPathOfExileCurrency,
  selectPathOfExileCurrencyStatus,
} from "../../slices/pathofexile/PathOfExileSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const PathOfExile = () => {
  const dispatch = useAppDispatch();

  const currencyStatus = useAppSelector(selectPathOfExileCurrencyStatus);
  const currency = useAppSelector(selectPathOfExileCurrency);

  useEffect(() => {
    if (currencyStatus === LOADING_STATE.IDLE) {
      dispatch(fetchPathOfExileCurrency());
    } else {
      dispatch(
        fetchPathOfExileTradeSearchPrice({
          tradeQuery: {
            query: {
              status: { option: "onlineleague" },
              type: "Voidborn Reliquary Key",
              stats: [{ type: "and", filters: [], disabled: false }],
            },
            sort: { price: "asc" },
          },
          currency: currency,
        })
      );
    }
  }, [currency]);

  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        borderRadius: 0,
        overflow: "auto",
      }}
      elevation={0}
    ></Paper>
  );
};

export default PathOfExile;
