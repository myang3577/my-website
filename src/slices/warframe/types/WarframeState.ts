import { LOADING_STATE } from "../../../constants/Constants";
import { ExportCustomsEn } from "./export/ExportCustoms_en";
import { ExportDronesEn } from "./export/ExportDrones_en";
import { ExportFlavourEn } from "./export/ExportFlavour_en";
import { ExportFusionBundlesEn } from "./export/ExportFusionBundles_en";
import { ExportGearEn } from "./export/ExportGear_en";
import { ExportKeysEn } from "./export/ExportKeys_en";
import { ExportManifest } from "./export/ExportManifest";
import { ExportRecipesEn } from "./export/ExportRecipes_en";
import { ExportRegionsEn } from "./export/ExportRegions_en";
import { ExportRelicArcaneEn } from "./export/ExportRelicArcane_en";
import { ExportResourcesEn } from "./export/ExportResources_en";
import { ExportSentinelsEn } from "./export/ExportSentinels_en";
import { ExportSortieRewardsEn } from "./export/ExportSortieRewards_en";
import { ExportUpgradesEn } from "./export/ExportUpgrades_en";
import { ExportWarframesEn } from "./export/ExportWarframes_en";
import { ExportWeaponsEn } from "./export/ExportWeapons_en";

export const EXPORT_CUSTOMS_EN = "ExportCustoms_en";
export const EXPORT_DRONES_EN = "ExportDrones_en";
export const EXPORT_FLAVOUR_EN = "ExportFlavour_en";
export const EXPORT_FUSIONBUNDLES_EN = "ExportFusionBundles_en";
export const EXPORT_GEAR_EN = "ExportGear_en";
export const EXPORT_KEYS_EN = "ExportKeys_en";
export const EXPORT_RECIPES_EN = "ExportRecipes_en";
export const EXPORT_REGIONS_EN = "ExportRegions_en";
export const EXPORT_RELICARCANE_EN = "ExportRelicArcane_en";
export const EXPORT_RESOURCES_EN = "ExportResources_en";
export const EXPORT_SENTINELS_EN = "ExportSentinels_en";
export const EXPORT_SORTIEREWARDS_EN = "ExportSortieRewards_en";
export const EXPORT_UPGRADES_EN = "ExportUpgrades_en";
export const EXPORT_WARFRAMES_EN = "ExportWarframes_en";
export const EXPORT_WEAPONS_EN = "ExportWeapons_en";
export const EXPORT_MANIFEST = "ExportManifest";

export type WarframeExports = {
  [EXPORT_CUSTOMS_EN]: ExportCustomsEn;
  [EXPORT_DRONES_EN]: ExportDronesEn;
  [EXPORT_FLAVOUR_EN]: ExportFlavourEn;
  [EXPORT_FUSIONBUNDLES_EN]: ExportFusionBundlesEn;
  [EXPORT_GEAR_EN]: ExportGearEn;
  [EXPORT_KEYS_EN]: ExportKeysEn;
  [EXPORT_RECIPES_EN]: ExportRecipesEn;
  [EXPORT_REGIONS_EN]: ExportRegionsEn;
  [EXPORT_RELICARCANE_EN]: ExportRelicArcaneEn;
  [EXPORT_RESOURCES_EN]: ExportResourcesEn;
  [EXPORT_SENTINELS_EN]: ExportSentinelsEn;
  [EXPORT_SORTIEREWARDS_EN]: ExportSortieRewardsEn;
  [EXPORT_UPGRADES_EN]: ExportUpgradesEn;
  [EXPORT_WARFRAMES_EN]: ExportWarframesEn;
  [EXPORT_WEAPONS_EN]: ExportWeaponsEn;
  [EXPORT_MANIFEST]: ExportManifest;
};

export interface IngredientCount {
  ingredient: string;
  count: number;
}

export interface AggregatedIngredientCount extends IngredientCount {
  ingredientDisplayName: string;
}

export interface WarframeState {
  value: number;
  warframeExportStatus: LOADING_STATE;
  warframeExports: WarframeExports;
  aggregateUncompletedWeaponIngredients: IngredientCount[];
}

export const getDefaultWarframeExport = (): WarframeExports =>
  structuredClone({
    [EXPORT_CUSTOMS_EN]: {
      ExportCustoms: [],
    },
    [EXPORT_DRONES_EN]: {
      ExportDrones: [],
    },
    [EXPORT_FLAVOUR_EN]: {
      ExportFlavour: [],
    },
    [EXPORT_FUSIONBUNDLES_EN]: {
      ExportFusionBundles: [],
    },
    [EXPORT_GEAR_EN]: {
      ExportGear: [],
    },
    [EXPORT_KEYS_EN]: {
      ExportKeys: [],
    },
    [EXPORT_RECIPES_EN]: {
      ExportRecipes: [],
    },
    [EXPORT_REGIONS_EN]: {
      ExportRegions: [],
    },
    [EXPORT_RELICARCANE_EN]: {
      ExportRelicArcane: [],
    },
    [EXPORT_RESOURCES_EN]: {
      ExportResources: [],
    },
    [EXPORT_SENTINELS_EN]: {
      ExportSentinels: [],
    },
    [EXPORT_SORTIEREWARDS_EN]: {
      ExportSortieRewards: [],
      ExportNightwave: {
        affiliationTag: "",
        challenges: [],
        rewards: [],
      },
      ExportRailjack: {
        nodes: [],
      },
      ExportIntrinsics: [],
      ExportOther: [],
    },
    [EXPORT_UPGRADES_EN]: {
      ExportUpgrades: [],
      ExportModSet: [],
      ExportAvionics: [],
      ExportFocusUpgrades: [],
    },
    [EXPORT_WARFRAMES_EN]: {
      ExportWarframes: [],
      ExportAbilities: [],
    },
    [EXPORT_WEAPONS_EN]: {
      ExportWeapons: [],
      ExportRailjackWeapons: [],
    },
    [EXPORT_MANIFEST]: {
      Manifest: [],
    },
  });
