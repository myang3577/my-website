import { Avatar, Card, CardContent, CardHeader, CircularProgress, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Manifest } from "../../../slices/warframe/types/export/ExportManifest";
import { Ingredient } from "../../../slices/warframe/types/export/ExportRecipes_en";
import { ExportWeapon } from "../../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_MANIFEST, EXPORT_RECIPES_EN } from "../../../slices/warframe/types/WarframeState";
import { selectWarframeExports } from "../../../slices/warframe/WarframeSlice";
import { useAppSelector } from "../../../store";
import { findRecipe, getImage, getWikiLink } from "../Utils";
import WeaponIngredientList from "./WeaponIngredientList";

interface WeaponCardProps {
  weapon: ExportWeapon;
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
      // dispatch(addUncompletedWeaponIngredients(weaponRecipe.ingredients));
    }
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
