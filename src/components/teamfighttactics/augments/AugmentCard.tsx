import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import { TftMetasrc } from "../../../slices/teamfighttactics/types/TftMetasrc";

interface AugmentCardProps {
  augment: TftMetasrc | undefined;
}

const METASRC_BASE_URL = "https://www.metasrc.com/tft";

export const AugmentCard = ({ augment }: AugmentCardProps) => {
  return (
    <div>
      {augment !== undefined && (
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column" }}>
          <CardMedia component="img" sx={{ width: "auto", height: "100px", margin: "auto" }} src={augment.image} />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h6">{augment.name}</Typography>
            <Typography variant="body2">{augment.tier}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
