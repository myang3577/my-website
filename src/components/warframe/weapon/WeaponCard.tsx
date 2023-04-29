import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Manifest } from "../../../slices/warframe/types/export/ExportManifest";
import { ExportRecipe, Ingredient } from "../../../slices/warframe/types/export/ExportRecipes_en";
import { ExportWeapon } from "../../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_MANIFEST, EXPORT_RECIPES_EN } from "../../../slices/warframe/types/WarframeState";
import { selectWarframeExports } from "../../../slices/warframe/WarframeSlice";
import { useAppSelector } from "../../../store";
import { getImage } from "../Utils";

interface WeaponCardProps {
  weapon: ExportWeapon;
}

const WeaponCard = ({ weapon }: WeaponCardProps) => {
  const warframeExports = useAppSelector(selectWarframeExports);

  const [imageLocation, setImageLocation] = useState<string>("");
  const exportManifest = warframeExports[EXPORT_MANIFEST];
  useEffect(() => {
    if (exportManifest === undefined || weapon === undefined) return;

    const weaponManifest = exportManifest.Manifest.find((e: Manifest) => e.uniqueName === weapon.uniqueName);

    if (weaponManifest !== undefined) setImageLocation(getImage(weapon.uniqueName, exportManifest));
  }, [exportManifest, weapon]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const exportRecipes = warframeExports[EXPORT_RECIPES_EN];
  useEffect(() => {
    if (exportRecipes === undefined || weapon === undefined) return;

    const weaponRecipe = exportRecipes.ExportRecipes.find(
      (recipe: ExportRecipe) => recipe.resultType === weapon.uniqueName
    );

    if (weaponRecipe !== undefined) setIngredients(weaponRecipe.ingredients);
  }, [exportRecipes, weapon]);

  return (
    <div>
      {weapon === undefined ? (
        <CircularProgress />
      ) : (
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column" }}>
          <CardHeader
            avatar={<Avatar src={imageLocation} variant="rounded" />}
            title={
              <Link href={`https://warframe.fandom.com/wiki/${weapon.name}`} underline="hover" target="_blank">
                <Typography variant="h6" marginBottom={1}>
                  {" "}
                  {weapon.name}
                </Typography>
              </Link>
            }
            subheader={weapon.productCategory}
          />
          <CardContent>
            <List dense>
              <Divider variant="middle" />
              {ingredients.map((ingredient: Ingredient, i: number) => (
                <>
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar src={getImage(ingredient.ItemType, exportManifest)} />
                    </ListItemAvatar>
                    <ListItemText primary={ingredient.ItemType.split("/").pop()} secondary={ingredient.ItemCount} />
                  </ListItem>
                  <Divider variant="middle" />
                </>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeaponCard;
