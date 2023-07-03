import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from "@mui/material";

import { TftMetasrc } from "../../../slices/teamfighttactics/types/TftMetasrc";

interface AugmentCardProps {
  augment: TftMetasrc | undefined;
}

const METASRC_BASE_URL = "https://www.metasrc.com/tft";

export const AugmentCard = ({ augment }: AugmentCardProps) => (
  <div>
    {augment !== undefined && (
      <Card variant="outlined" sx={{ display: "flex", flexDirection: "column" }}>
        <CardActionArea>
          <Link href={`${METASRC_BASE_URL}${augment.path}`} underline="hover" target="_blank">
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
          </Link>
        </CardActionArea>
      </Card>
    )}
  </div>
);
