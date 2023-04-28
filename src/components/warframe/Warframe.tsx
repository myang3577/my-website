import { Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import { ExportWeapon } from "../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_WEAPONS_EN } from "../../slices/warframe/types/WarframeState";
import { fetchExports, selectWarframeExports, selectWarframeExportStatus } from "../../slices/warframe/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { withIdField } from "../../utils/Utils";
import { MASTERY_COMPLETED } from "./MasteryCompletedList";
import WeaponCard from "./WeaponCard";

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

  const [uncompletedWeapons, setUncompletedWeapons] = useState<ExportWeapon[]>([]);
  const [completedWeapons, setCompletedWeapons] = useState<ExportWeapon[]>([]);

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
      <Grid container spacing={3} columns={2} sx={{ width: "100%", margin: "auto" }}>
        <Grid xs={2}>
          <Typography variant="h4">Warframe Weapons</Typography>
        </Grid>
        <Grid xs={2}>
          <WeaponCard weapon={completedWeapons[0]} />
        </Grid>

        <Grid xs={1}>
          <Paper sx={{ p: "10px" }}>
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
          <Paper sx={{ p: "10px" }}>
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
