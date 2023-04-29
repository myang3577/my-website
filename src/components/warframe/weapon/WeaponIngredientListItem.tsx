import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import { Ingredient } from "../../../slices/warframe/types/export/ExportRecipes_en";
import { EXPORT_MANIFEST } from "../../../slices/warframe/types/WarframeState";
import { selectWarframeExports } from "../../../slices/warframe/WarframeSlice";
import { useAppSelector } from "../../../store";
import { getImage } from "../Utils";

interface WeaponIngredientListItemProps {
  ingredient: Ingredient;
  children?: React.ReactNode;
}

const WeaponIngredientListItem = ({ ingredient, children }: WeaponIngredientListItemProps) => {
  const warframeExports = useAppSelector(selectWarframeExports);

  const exportManifest = warframeExports[EXPORT_MANIFEST];

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={getImage(ingredient.ItemType, exportManifest)} />
      </ListItemAvatar>
      <ListItemText primary={ingredient.ItemType.split("/").pop()} secondary={ingredient.ItemCount} />
      {children !== undefined && children}
    </ListItem>
  );
};

export default WeaponIngredientListItem;
