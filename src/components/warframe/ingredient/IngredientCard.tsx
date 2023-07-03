import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { AggregatedIngredientCount, EXPORT_MANIFEST } from "../../../slices/warframe/types/WarframeState";
import { selectWarframeExports } from "../../../slices/warframe/WarframeSlice";
import { useAppSelector } from "../../../store";
import { getImage, getWikiLink } from "../Utils";

const splitAtCapital = (str: string) => {
  return str.replace(/([A-Z])/g, " $1").trim();
};

interface IngredientCardProps {
  aggregatedIngredient: AggregatedIngredientCount | undefined;
}

export const IngredientCard = ({ aggregatedIngredient }: IngredientCardProps) => {
  const warframeExports = useAppSelector(selectWarframeExports);
  const { ingredient, count, ingredientDisplayName } = aggregatedIngredient || { ingredient: undefined };

  // Handling image location
  const [imageLocation, setImageLocation] = useState<string>("");
  const exportManifest = warframeExports[EXPORT_MANIFEST];
  useEffect(() => {
    if (ingredient === undefined) return;

    setImageLocation(getImage(ingredient, exportManifest));
  }, [ingredient]);

  return (
    <div>
      {ingredient === undefined ? (
        // Skeleton loading card
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
            title={<Skeleton animation="wave" height="1.25rem" width="100%" style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation="wave" height="0.875rem" width="80%" style={{ marginBottom: 6 }} />}
          />

          <CardContent>
            <List dense>
              <Divider variant="middle" />

              {Array.from(Array(3).keys()).map((i) => (
                <div key={i}>
                  <ListItem>
                    <ListItemAvatar>
                      <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Skeleton animation="wave" height="0.875rem" width="100%" style={{ marginBottom: 6 }} />}
                      secondary={
                        <Skeleton animation="wave" height="0.875rem" width="80%" style={{ marginBottom: 6 }} />
                      }
                    />
                  </ListItem>
                  <Divider variant="middle" />
                </div>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        // Actual card with content
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia component="img" sx={{ width: "auto", height: "50px", margin: "auto" }} src={imageLocation} />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Link href={getWikiLink(splitAtCapital(ingredientDisplayName))} underline="hover" target="_blank">
              <Typography variant="h6">{splitAtCapital(ingredientDisplayName)}</Typography>
            </Link>
            <Typography>{count}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
