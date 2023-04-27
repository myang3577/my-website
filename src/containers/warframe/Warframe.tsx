import { Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import {
  EXPORT_WEAPONS_EN,
  fetchExports,
  selectWarframeExports,
  selectWarframeExportStatus,
} from "../../slices/warframe/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { withIdField } from "../../utils/Utils";
import { MASTERY_COMPLETED } from "./MasteryCompletedList";

interface WarframeExportWeaponsObject {
  name: string;
  uniqueName: string;
  codexSecret: boolean;
  damagePerShot: number[];
  totalDamage: number;
  description: string;
  criticalChance: number;
  criticalMultiplier: number;
  procChance: number;
  fireRate: number;
  masteryReq: number;
  productCategory: string;
  slot: number;
  accuracy: number;
  omegaAttenuation: number;
  noise: string;
  trigger: string;
  magazineSize: number;
  reloadTime: number;
  multishot: number;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 250 },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
];

const Warframe = () => {
  const dispatch = useAppDispatch();

  const warframeExportStatus = useAppSelector(selectWarframeExportStatus);
  const warframeExports = useAppSelector(selectWarframeExports);

  const [uncompletedWeapons, setUncompletedWeapons] = useState<WarframeExportWeaponsObject[]>([]);
  const [completedWeapons, setCompletedWeapons] = useState<WarframeExportWeaponsObject[]>([]);

  useEffect(() => {
    if (warframeExportStatus === LOADING_STATE.COMPLETE) {
      return;
    }

    dispatch(fetchExports());
  }, []);

  useEffect(() => {
    const EXPORT_WEAPONS = "ExportWeapons";

    if (!(EXPORT_WEAPONS_EN in warframeExports && EXPORT_WEAPONS in warframeExports[EXPORT_WEAPONS_EN])) {
      return;
    }

    const exportWeaponsObject = warframeExports[EXPORT_WEAPONS_EN];
    const exportWeaponsData = exportWeaponsObject[EXPORT_WEAPONS] as WarframeExportWeaponsObject[];

    const uncompletedWeaponsData = exportWeaponsData.filter(
      (weapon: WarframeExportWeaponsObject) => !MASTERY_COMPLETED.includes(weapon.name)
    );
    const completedWeaponsData = exportWeaponsData.filter((weapon: WarframeExportWeaponsObject) =>
      MASTERY_COMPLETED.includes(weapon.name)
    );

    setUncompletedWeapons(withIdField(uncompletedWeaponsData));
    setCompletedWeapons(withIdField(completedWeaponsData));
  }, [warframeExports]);

  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        borderRadius: 0,
        overflow: "auto",
      }}
      elevation={0}
    >
      <Grid container spacing={3} columns={2} sx={{ width: "100%", margin: "auto" }}>
        <Grid xs={2}>
          <Typography variant="h4">Warframe Weapons</Typography>
        </Grid>

        <Grid xs={1}>
          <Paper sx={{ p: "10px" }} variant="outlined">
            <Typography variant="h5" marginBottom={1}>
              Mastery uncompleted weapons
            </Typography>
            <DataGrid
              rows={uncompletedWeapons}
              columns={columns}
              checkboxSelection
              autoHeight
              loading={warframeExportStatus === LOADING_STATE.LOADING}
            />
          </Paper>
        </Grid>

        <Grid xs={1}>
          <Paper sx={{ p: "10px" }} variant="outlined">
            <Typography variant="h5" marginBottom={1}>
              Mastery completed weapons
            </Typography>
            <DataGrid
              rows={completedWeapons}
              columns={columns}
              checkboxSelection
              autoHeight
              loading={warframeExportStatus === LOADING_STATE.LOADING}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Warframe;
