import { Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import { ExportWeapon } from "../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_WEAPONS_EN } from "../../slices/warframe/types/WarframeState";
import { fetchExports, selectWarframeExports, selectWarframeExportStatus } from "../../slices/warframe/WarframeSlice";
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

  const [uncompletedWeapons, setUncompletedWeapons] = useState<ExportWeapon[]>([]);
  const [completedWeapons, setCompletedWeapons] = useState<ExportWeapon[]>([]);

  useEffect(() => {
    if (warframeExportStatus === LOADING_STATE.COMPLETE) return;

    dispatch(fetchExports());
  }, []);

  useEffect(() => {
    const EXPORT_WEAPONS = "ExportWeapons";

    if (!(EXPORT_WEAPONS_EN in warframeExports && EXPORT_WEAPONS in warframeExports[EXPORT_WEAPONS_EN])) {
      return;
    }

    const exportWeaponsObject = warframeExports[EXPORT_WEAPONS_EN];
    const exportWeaponsData = exportWeaponsObject.ExportWeapons;

    const uncompletedWeaponsData = exportWeaponsData.filter(
      (weapon: ExportWeapon) => !MASTERY_COMPLETED.includes(weapon.name)
    );
    const completedWeaponsData = exportWeaponsData.filter((weapon: ExportWeapon) =>
      MASTERY_COMPLETED.includes(weapon.name)
    );

    setUncompletedWeapons(withIdField(uncompletedWeaponsData));
    setCompletedWeapons(withIdField(completedWeaponsData));
  }, [warframeExports]);

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
          <Paper sx={{ p: `${GRID_SPACING_SIZE * GRID_SPACING_VALUE}px` }}>
            <Typography variant="h6">Completed Weapons</Typography>
            <WeaponCardGrid weapons={completedWeapons} />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Warframe;
