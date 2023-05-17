import { ExportRecipe } from "../../slices/warframe/types/export/ExportRecipes_en";
import { ExportWeapon } from "../../slices/warframe/types/export/ExportWeapons_en";

export const findRecipeForWeapon = (weapon: ExportWeapon, recipes: ExportRecipe[]): ExportRecipe | undefined =>
  findRecipe(weapon.uniqueName, recipes);

export const findRecipe = (item: string, recipes: ExportRecipe[]): ExportRecipe | undefined =>
  recipes.find((recipe: ExportRecipe) => recipe.resultType === item);

export const hasRecipe = (item: string, recipes: ExportRecipe[]): boolean => findRecipe(item, recipes) !== undefined;
