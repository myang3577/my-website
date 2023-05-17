import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
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

import { Manifest } from "../../../slices/warframe/types/export/ExportManifest";
import { Ingredient } from "../../../slices/warframe/types/export/ExportRecipes_en";
import { ExportWeapon } from "../../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_MANIFEST, EXPORT_RECIPES_EN } from "../../../slices/warframe/types/WarframeState";
import { selectWarframeExports } from "../../../slices/warframe/WarframeSlice";
import { useAppSelector } from "../../../store";
import { findRecipe } from "../RecipeUtils";
import { getImage, getWikiLink } from "../Utils";
import WeaponIngredientList from "./WeaponIngredientList";

interface WeaponCardProps {
  weapon: ExportWeapon | undefined;
}

const WeaponCard = ({ weapon }: WeaponCardProps) => {
  const warframeExports = useAppSelector(selectWarframeExports);

  // Handling image location
  const [imageLocation, setImageLocation] = useState<string>("");
  const exportManifest = warframeExports[EXPORT_MANIFEST];
  useEffect(() => {
    if (exportManifest === undefined || weapon === undefined) return;

    const weaponManifest = exportManifest.Manifest.find((e: Manifest) => e.uniqueName === weapon.uniqueName);

    if (weaponManifest !== undefined) setImageLocation(getImage(weapon.uniqueName, exportManifest));
  }, [exportManifest, weapon]);

  // Handling ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const exportRecipes = warframeExports[EXPORT_RECIPES_EN];

  useEffect(() => {
    if (exportRecipes === undefined || weapon === undefined) return;

    const weaponRecipe = findRecipe(weapon.uniqueName, exportRecipes.ExportRecipes);

    if (weaponRecipe !== undefined) {
      setIngredients(weaponRecipe.ingredients);
    }
  }, [exportRecipes, weapon]);

  return (
    <div>
      {weapon === undefined ? (
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
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<Avatar src={imageLocation} variant="rounded" />}
            title={
              <Link href={getWikiLink(weapon.name)} underline="hover" target="_blank">
                <Typography variant="h6">{weapon.name}</Typography>
              </Link>
            }
            subheader={weapon.productCategory}
          />

          <CardContent>
            <WeaponIngredientList ingredients={ingredients} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeaponCard;
