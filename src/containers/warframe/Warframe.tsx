import { LoadingButton } from "@mui/lab";
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

  const [wfExportWeapons, setWfExportWeapons] = useState<WarframeExportWeaponsObject[]>([]);

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

    setWfExportWeapons(withIdField(exportWeaponsData));
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
      <Grid container spacing={3} columns={1} sx={{ width: "100%", margin: "auto" }}>
        {/* Weapons section */}
        <Grid xs={1}>
          <Paper sx={{ p: "10px" }}>
            <Typography variant="h4" marginBottom={1}>
              Warframe Weapons
            </Typography>
            <LoadingButton
              onClick={() => dispatch(fetchExports())}
              loading={warframeExportStatus === LOADING_STATE.LOADING}
              variant="contained"
            >
              Fetch Warframe Exports
            </LoadingButton>
            <DataGrid
              rows={wfExportWeapons}
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
