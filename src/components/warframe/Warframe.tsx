import { Pagination, Paper, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import { ExportWeapon } from "../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_WEAPONS_EN } from "../../slices/warframe/types/WarframeState";
import { fetchExports, selectWarframeExports, selectWarframeExportStatus } from "../../slices/warframe/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { withIdField } from "../../utils/Utils";
import { MASTERY_COMPLETED } from "./MasteryCompletedList";
import WeaponCard from "./weapon/WeaponCard";

const Warframe = () => {
  const dispatch = useAppDispatch();

  const warframeExportStatus = useAppSelector(selectWarframeExportStatus);
  const warframeExports = useAppSelector(selectWarframeExports);

  const [uncompletedWeapons, setUncompletedWeapons] = useState<ExportWeapon[]>([]);
  // const [completedWeapons, setCompletedWeapons] = useState<ExportWeapon[]>([]);

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
    // const completedWeaponsData = exportWeaponsData.filter((weapon: ExportWeapon) =>
    //   MASTERY_COMPLETED.includes(weapon.name)
    // );

    setUncompletedWeapons(withIdField(uncompletedWeaponsData));
    // setCompletedWeapons(withIdField(completedWeaponsData));
  }, [warframeExports]);

  return (
    <Paper>
      <Grid container spacing={3} columns={2} sx={{ width: "100%", margin: "auto" }}>
        <Grid xs={2}>
          <Typography variant="h4">Warframe Weapons</Typography>
        </Grid>

        <Grid xs={2}>
          <Paper sx={{ p: "4px" }}>
            <Stack direction={"row"}>
              <Typography
                variant="h5"
                marginBottom={1}
                sx={{
                  flexGrow: 1,
                }}
              >
                Mastery uncompleted weapons
              </Typography>
              <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
            </Stack>
            <Grid container spacing={1} columns={{ xs: 1, sm: 3, md: 6 }} sx={{ width: "100%", margin: "auto" }}>
              {uncompletedWeapons.slice(0, 10).map((weapon, i) => (
                <Grid xs={1} key={i}>
                  <WeaponCard weapon={weapon} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Warframe;
