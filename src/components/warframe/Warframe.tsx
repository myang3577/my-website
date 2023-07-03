import { Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import { ExportWeapon } from "../../slices/warframe/types/export/ExportWeapons_en";
import {
  AggregatedIngredientCount,
  EXPORT_RECIPES_EN,
  EXPORT_WEAPONS_EN,
} from "../../slices/warframe/types/WarframeState";
import {
  aggregateUncompletedWeaponIngredients,
  fetchExports,
  selectAggregateUncompletedWeaponIngredients,
  selectWarframeExports,
  selectWarframeExportStatus,
} from "../../slices/warframe/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { withIdField } from "../../utils/Utils";
import { IngredientCardGrid } from "./ingredient/IngredientCardGrid";
import { MASTERY_COMPLETED } from "./MasteryCompletedList";
import { WeaponCardGrid } from "./weapon/WeaponCardGrid";

const GRID_SPACING_SIZE = 4;
const GRID_SPACING_VALUE = 2;

export const Warframe = () => {
  const dispatch = useAppDispatch();

  const warframeExportStatus = useAppSelector(selectWarframeExportStatus);
  const warframeExports = useAppSelector(selectWarframeExports);
  const aggregateUncompletedWeaponIngredientsData = useAppSelector(selectAggregateUncompletedWeaponIngredients);

  const [uncompletedWeapons, setUncompletedWeapons] = useState<ExportWeapon[]>([]);

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

    setUncompletedWeapons(withIdField(uncompletedWeaponsData));

    dispatch(
      aggregateUncompletedWeaponIngredients({
        weapons: uncompletedWeaponsData,
        recipes: warframeExports[EXPORT_RECIPES_EN].ExportRecipes,
      })
    );
  }, [warframeExportStatus]);

  const sortIngredients = (a: AggregatedIngredientCount, b: AggregatedIngredientCount) => b.count - a.count;

  return (
    <Paper>
      <Grid container spacing={GRID_SPACING_VALUE} columns={2} sx={{ width: "100%", margin: "auto" }}>
        <Grid xs={2}>
          <Typography variant="h4">Warframe Weapons</Typography>
        </Grid>

        <Grid xs={2}>
          <Paper sx={{ p: `${GRID_SPACING_SIZE * GRID_SPACING_VALUE}px` }}>
            <Typography variant="h6">Uncompleted Weapon Ingredients</Typography>
            <IngredientCardGrid
              aggregatedIngredients={[...aggregateUncompletedWeaponIngredientsData].sort(sortIngredients)}
            />
          </Paper>
        </Grid>

        <Grid xs={2}>
          <Paper sx={{ p: `${GRID_SPACING_SIZE * GRID_SPACING_VALUE}px` }}>
            <Typography variant="h6">Uncompleted Weapons</Typography>
            <WeaponCardGrid weapons={uncompletedWeapons} />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
