import { Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import { ExportWeapon } from "../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_RECIPES_EN, EXPORT_WEAPONS_EN } from "../../slices/warframe/types/WarframeState";
import {
  aggregateUncompletedWeaponIngredients,
  fetchExports,
  selectAggregateUncompletedWeaponIngredients,
  selectWarframeExports,
  selectWarframeExportStatus,
} from "../../slices/warframe/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { withIdField } from "../../utils/Utils";
import { MASTERY_COMPLETED } from "./MasteryCompletedList";
import WeaponCardGrid from "./weapon/WeaponCardGrid";

const GRID_SPACING_SIZE = 4;
const GRID_SPACING_VALUE = 1;

const Warframe = () => {
  const dispatch = useAppDispatch();

  const warframeExportStatus = useAppSelector(selectWarframeExportStatus);
  const warframeExports = useAppSelector(selectWarframeExports);
  const aggregateUncompletedWeaponIngredientsData = useAppSelector(selectAggregateUncompletedWeaponIngredients);

  const [uncompletedWeapons, setUncompletedWeapons] = useState<ExportWeapon[]>([]);
  // const [completedWeapons, setCompletedWeapons] = useState<ExportWeapon[]>([]);

  const columns: GridColDef[] = [
    { field: "ingredientDisplayName", headerName: "Ingredient", minWidth: 500 },
    { field: "count", headerName: "Count", type: "number", minWidth: 200 },
  ];

  useEffect(() => {
    if (warframeExportStatus === LOADING_STATE.COMPLETE) return;

    dispatch(fetchExports());
  }, []);

  useEffect(() => {
    if (warframeExportStatus != LOADING_STATE.COMPLETE) return;

    const exportWeaponsData = warframeExports[EXPORT_WEAPONS_EN].ExportWeapons;

    const uncompletedWeaponsData: ExportWeapon[] = exportWeaponsData.filter(
      (weapon: ExportWeapon) => !MASTERY_COMPLETED.includes(weapon.name)
    );
    // const completedWeaponsData: ExportWeapon[] = exportWeaponsData.filter((weapon: ExportWeapon) =>
    //   MASTERY_COMPLETED.includes(weapon.name)
    // );

    setUncompletedWeapons(withIdField(uncompletedWeaponsData));
    // setCompletedWeapons(withIdField(completedWeaponsData));

    dispatch(
      aggregateUncompletedWeaponIngredients({
        weapons: uncompletedWeaponsData,
        recipes: warframeExports[EXPORT_RECIPES_EN].ExportRecipes,
      })
    );
  }, [warframeExportStatus]);

  return (
    <Paper>
      <Grid container spacing={GRID_SPACING_VALUE} columns={2} sx={{ width: "100%", margin: "auto" }}>
        <Grid xs={2}>
          <Typography variant="h4">Warframe Weapons</Typography>
        </Grid>

        <Grid xs={2}>
          <Paper sx={{ p: `${GRID_SPACING_SIZE * GRID_SPACING_VALUE}px` }}>
            <Typography variant="h6">Uncompleted Weapons</Typography>
            <WeaponCardGrid weapons={uncompletedWeapons} />
          </Paper>
        </Grid>

        <Grid xs={2}>
          <Paper sx={{ p: "10px" }}>
            <Typography variant="h4" marginBottom={1}>
              Uncompleted Weapons Aggregated Ingredients
            </Typography>
            <DataGrid
              rows={withIdField(aggregateUncompletedWeaponIngredientsData)}
              columns={columns}
              checkboxSelection
              autoHeight
              loading={warframeExportStatus === LOADING_STATE.LOADING}
              initialState={{
                sorting: { sortModel: [{ field: "count", sort: "desc" }] },
              }}
            />
          </Paper>
        </Grid>

        {/* <Grid xs={2}>
          <Paper sx={{ p: `${GRID_SPACING_SIZE * GRID_SPACING_VALUE}px` }}>
            <Typography variant="h6">Completed Weapons</Typography>
            <WeaponCardGrid weapons={completedWeapons} />
          </Paper>
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default Warframe;
