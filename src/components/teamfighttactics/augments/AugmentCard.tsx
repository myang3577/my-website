import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import { TftMetasrc } from "../../../slices/teamfighttactics/types/TftMetasrc";

interface AugmentCardProps {
  augment: TftMetasrc | undefined;
}

export const AugmentCard = ({ augment }: AugmentCardProps) => {
  return (
    <div>
      {augment !== undefined && (
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            sx={{
              width: "auto",
              height: "100px",
              margin: "auto",
              paddingTop: "5px",
            }}
            src={augment.image}
          />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h6">{augment.name}</Typography>
            <Typography variant="body2">{augment.tier} Tier</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
