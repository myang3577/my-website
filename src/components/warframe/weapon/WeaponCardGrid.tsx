import { Grid, Pagination, Stack, Zoom } from "@mui/material";
import { ChangeEvent, useState } from "react";

import { ExportWeapon } from "../../../slices/warframe/types/export/ExportWeapons_en";
import WeaponCard from "./WeaponCard";

interface WeaponGridCardProps {
  weapons: ExportWeapon[];
}

const MAX_COL_SIZE = 6;
const ROWS = 3;
const ITEMS = ROWS * MAX_COL_SIZE;

const WeaponCardGrid = ({ weapons }: WeaponGridCardProps) => {
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <Stack alignItems={"center"}>
        <Pagination
          count={Math.ceil(weapons.length / ITEMS)}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{ marginBottom: "4px" }}
          page={page}
          onChange={(_: ChangeEvent<unknown>, page: number) => setPage(page)}
        />
      </Stack>
      <Grid container spacing={0.5} columns={{ xs: 1, sm: 3, md: MAX_COL_SIZE }}>
        {weapons.slice(ITEMS * (page - 1), ITEMS * page).map((weapon, i) => (
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
              <WeaponCard weapon={weapon} />
            </Grid>
          </Zoom>
        ))}
      </Grid>
    </>
  );
};

export default WeaponCardGrid;
