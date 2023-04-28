import { Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import {
  fetchPathOfExileCurrency,
  fetchPathOfExileTradeSearchPrice,
  selectPathOfExileAveragePrice,
  selectPathOfExileCurrency,
  selectPathOfExileCurrencyStatus,
} from "../../slices/pathofexile/PathOfExileSlice";
import { PoeNinjaCurrencyResult } from "../../slices/pathofexile/types/PoeNinjaCurrencyResult";
import { useAppDispatch, useAppSelector } from "../../store";
import { withIdField } from "../../utils/Utils";

const PathOfExile = () => {
  const dispatch = useAppDispatch();

  const currencyStatus = useAppSelector(selectPathOfExileCurrencyStatus);
  const currency = useAppSelector(selectPathOfExileCurrency);
  const voidbornReliquaryKeyAvgPrice = useAppSelector(selectPathOfExileAveragePrice("Voidborn Reliquary Key"));

  const [currencyRates, setCurrencyRates] = useState<PoeNinjaCurrencyResult["lines"]>([]);

  const columns: GridColDef[] = [
    { field: "currencyTypeName", headerName: "Currency", minWidth: 200 },
    { field: "chaosEquivalent", headerName: "Chaos Equivalent", type: "number", minWidth: 200 },
  ];

  useEffect(() => {
    if (currencyStatus === LOADING_STATE.IDLE) {
      dispatch(fetchPathOfExileCurrency());
    } else {
      dispatch(
        fetchPathOfExileTradeSearchPrice({
          itemName: "Voidborn Reliquary Key",
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

  useEffect(() => {
    if (currencyStatus === LOADING_STATE.COMPLETE) {
      setCurrencyRates(withIdField(currency.lines));
    }
  }, [currencyStatus, currency]);

  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        borderRadius: 0,
        overflow: "auto",
      }}
    >
      <Grid container spacing={3} columns={1} sx={{ width: "100%", margin: "auto" }}>
        <Grid xs={1}>
          <Paper sx={{ p: "10px" }}>
            <Typography variant="h4" marginBottom={1}>
              Average Price of Voidborn Reliquary Key: {voidbornReliquaryKeyAvgPrice} chaos
            </Typography>
          </Paper>
        </Grid>
        {/* poe.ninja rates section */}
        <Grid xs={1}>
          <Paper sx={{ p: "10px" }}>
            <Typography variant="h4" marginBottom={1}>
              poe.ninja rates
            </Typography>
            <DataGrid
              rows={currencyRates}
              columns={columns}
              checkboxSelection
              autoHeight
              loading={currencyStatus === LOADING_STATE.LOADING}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PathOfExile;
