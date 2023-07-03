import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, Divider, List } from "@mui/material";
import { useState } from "react";

import { Ingredient } from "../../../slices/warframe/types/export/ExportRecipes_en";
import { EXPORT_RECIPES_EN } from "../../../slices/warframe/types/WarframeState";
import { selectWarframeExports } from "../../../slices/warframe/WarframeSlice";
import { useAppSelector } from "../../../store";
import { ExpandMore } from "../../common/ExpandMore";
import { findRecipe, hasRecipe } from "../RecipeUtils";
import { WeaponIngredientListItem } from "./WeaponIngredientListItem";

interface WeaponIngredientListProps {
  ingredients: Ingredient[];
}

export const WeaponIngredientList = ({ ingredients }: WeaponIngredientListProps) => {
  const warframeExports = useAppSelector(selectWarframeExports);

  const exportRecipes = warframeExports[EXPORT_RECIPES_EN];

  const [expanded, setExpanded] = useState<{ [item: string]: boolean }>({});

  const handleExpandClick = (item: string) => {
    const newExpanded = structuredClone(expanded);
    newExpanded[item] = !expanded[item];
    setExpanded(newExpanded);
  };

  return (
    <List dense>
      <Divider variant="middle" />

      {ingredients.map((ingredient: Ingredient, i: number) => (
        <div key={i}>
          <WeaponIngredientListItem ingredient={ingredient}>
            {hasRecipe(ingredient.ItemType, exportRecipes.ExportRecipes) && (
              <ExpandMore expand={expanded[ingredient.ItemType]} onClick={() => handleExpandClick(ingredient.ItemType)}>
                <ExpandMoreIcon />
              </ExpandMore>
            )}
          </WeaponIngredientListItem>

          {hasRecipe(ingredient.ItemType, exportRecipes.ExportRecipes) && (
            <Collapse in={expanded[ingredient.ItemType]} timeout="auto" unmountOnExit>
              <List dense>
                {findRecipe(ingredient.ItemType, exportRecipes.ExportRecipes)?.ingredients.map(
                  (ingredient: Ingredient, i: number) => (
                    <WeaponIngredientListItem ingredient={ingredient} key={i} />
                  )
                )}
              </List>
            </Collapse>
          )}
          <Divider variant="middle" />
        </div>
      ))}
    </List>
  );
};
