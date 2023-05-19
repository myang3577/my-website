import { Grid, Pagination, Stack, Zoom } from "@mui/material";
import { ChangeEvent, useState } from "react";

import { AggregatedIngredientCount } from "../../../slices/warframe/types/WarframeState";
import IngredientCard from "./IngredientCard";

interface IngredientCardGridProps {
  aggregatedIngredients: AggregatedIngredientCount[];
}

const MAX_COL_SIZE = 6;
const ROWS = 6;
const ITEMS = ROWS * MAX_COL_SIZE;

const IngredientCardGrid = ({ aggregatedIngredients }: IngredientCardGridProps) => {
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <Stack alignItems={"center"}>
        <Pagination
          count={Math.ceil(aggregatedIngredients.length / ITEMS)}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{ marginBottom: "4px" }}
          page={page}
          onChange={(_: ChangeEvent<unknown>, page: number) => setPage(page)}
        />
      </Stack>

      <Grid container spacing={0.5} columns={{ xs: 1, sm: 3, md: MAX_COL_SIZE }}>
        {aggregatedIngredients.length === 0 ? (
          Array.from(Array(MAX_COL_SIZE).keys()).map((i) => (
            <Grid item xs={1} key={i}>
              <IngredientCard aggregatedIngredient={undefined} />
            </Grid>
          ))
        ) : (
          <>
            {aggregatedIngredients.slice(ITEMS * (page - 1), ITEMS * page).map((aggregatedIngredient, i) => (
              <Zoom
                in={true}
                timeout={1000}
                style={{
                  transformOrigin: "0 0 0",
                  transitionDelay: `${i * 40}ms`,
                }}
                key={i}
              >
                <Grid item xs={1}>
                  <IngredientCard aggregatedIngredient={aggregatedIngredient} />
                </Grid>
              </Zoom>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default IngredientCardGrid;
