export interface ExportRecipesEn {
  ExportRecipes: ExportRecipe[];
}

export interface ExportRecipe {
  uniqueName: string;
  resultType: string;
  buildPrice: number;
  buildTime: number;
  skipBuildTimePrice: number;
  consumeOnUse: boolean;
  num: number;
  codexSecret: boolean;
  ingredients: Ingredient[];
  secretIngredients: SecretIngredient[];
  excludeFromCodex?: boolean;
  primeSellingPrice?: number;
  alwaysAvailable?: boolean;
}

export interface Ingredient {
  ItemType: string;
  ItemCount: number;
  ProductCategory: ProductCategory;
}

export enum ProductCategory {
  Consumables = "Consumables",
  LongGuns = "LongGuns",
  Melee = "Melee",
  MiscItems = "MiscItems",
  Pistols = "Pistols",
  WeaponSkins = "WeaponSkins",
}

export interface SecretIngredient {
  ItemType: ItemType;
  ItemCount: number;
}

export enum ItemType {
  LotusTypesGameLotusMeleeWeapon = "/Lotus/Types/Game/LotusMeleeWeapon",
  LotusTypesGamePowerSuitsPlayerPowerSuit = "/Lotus/Types/Game/PowerSuits/PlayerPowerSuit",
  LotusWeaponsTennoLotusLongGun = "/Lotus/Weapons/Tenno/LotusLongGun",
  LotusWeaponsTennoPistolLotusPistol = "/Lotus/Weapons/Tenno/Pistol/LotusPistol",
}
