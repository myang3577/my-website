import { Paper } from "@mui/material";
import { useEffect } from "react";

import {
  fetchPathOfExileCurrency,
  fetchPathOfExileTradeSearchPrice,
  selectPathOfExileCurrency,
} from "../../slices/pathofexile/PathOfExileSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const PathOfExile = () => {
  const dispatch = useAppDispatch();

  const currency = useAppSelector(selectPathOfExileCurrency);

  useEffect(() => {
    dispatch(fetchPathOfExileCurrency());
    dispatch(
      fetchPathOfExileTradeSearchPrice({
        query: {
          status: { option: "onlineleague" },
          type: "Voidborn Reliquary Key",
          stats: [{ type: "and", filters: [], disabled: false }],
        },
        sort: { price: "asc" },
      })
    );
  }, []);

  // useEffect(() => {
  //   console.log(currency);
  // }, [currency]);

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
