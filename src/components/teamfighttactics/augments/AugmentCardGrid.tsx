import { Grid } from "@mui/material";

import { TftMetasrc } from "../../../slices/teamfighttactics/types/TftMetasrc";
import { AugmentCard } from "./AugmentCard";

interface AugmentCardGridProps {
  augments: TftMetasrc[];
}

const MAX_COL_SIZE = 10;

export const AugmentCardGrid = ({ augments }: AugmentCardGridProps) => {
  return (
    <Grid container spacing={0.5} columns={{ xs: MAX_COL_SIZE / 4, sm: MAX_COL_SIZE / 2, md: MAX_COL_SIZE }}>
      {augments.length !== 0 && (
        <>
          {augments.map((augment, i) => (
            <Grid item xs={1} key={i}>
              <AugmentCard augment={augment} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};
