import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { findRecipe } from "../../components/warframe/RecipeUtils";
import { LOADING_STATE } from "../../constants/Constants";
import { RootState } from "../../store";
import { Dict } from "../../types/Types";
import { ExportCustomsEn } from "./types/export/ExportCustoms_en";
import { ExportDronesEn } from "./types/export/ExportDrones_en";
import { ExportFlavourEn } from "./types/export/ExportFlavour_en";
import { ExportFusionBundlesEn } from "./types/export/ExportFusionBundles_en";
import { ExportGearEn } from "./types/export/ExportGear_en";
import { ExportKeysEn } from "./types/export/ExportKeys_en";
import { ExportManifest } from "./types/export/ExportManifest";
import { ExportRecipe, ExportRecipesEn } from "./types/export/ExportRecipes_en";
import { ExportRegionsEn } from "./types/export/ExportRegions_en";
import { ExportRelicArcaneEn } from "./types/export/ExportRelicArcane_en";
import { ExportResourcesEn } from "./types/export/ExportResources_en";
import { ExportSentinelsEn } from "./types/export/ExportSentinels_en";
import { ExportSortieRewardsEn } from "./types/export/ExportSortieRewards_en";
import { ExportUpgradesEn } from "./types/export/ExportUpgrades_en";
import { ExportWarframesEn } from "./types/export/ExportWarframes_en";
import { ExportWeapon, ExportWeaponsEn } from "./types/export/ExportWeapons_en";
import {
  AggregatedIngredientCount,
  EXPORT_CUSTOMS_EN,
  EXPORT_DRONES_EN,
  EXPORT_FLAVOUR_EN,
  EXPORT_FUSIONBUNDLES_EN,
  EXPORT_GEAR_EN,
  EXPORT_KEYS_EN,
  EXPORT_MANIFEST,
  EXPORT_RECIPES_EN,
  EXPORT_REGIONS_EN,
  EXPORT_RELICARCANE_EN,
  EXPORT_RESOURCES_EN,
  EXPORT_SENTINELS_EN,
  EXPORT_SORTIEREWARDS_EN,
  EXPORT_UPGRADES_EN,
  EXPORT_WARFRAMES_EN,
  EXPORT_WEAPONS_EN,
  getDefaultWarframeExport,
  WarframeExports,
  WarframeState,
} from "./types/WarframeState";

const MANIFEST_URL = "https://content.warframe.com/PublicExport/Manifest/";

const initialState: WarframeState = {
  value: 0,
  warframeExportStatus: LOADING_STATE.IDLE,
  warframeExports: getDefaultWarframeExport(),
  aggregateUncompletedWeaponIngredients: [],
};

/**
 * Manually fetched from: https://origin.warframe.com/PublicExport/index_en.txt.lzma.
 */
const EXPORT_NAMES = [
  "ExportCustoms_en.json!00_eMmfFW0cBmhMgKCVg4OrVQ",
  "ExportDrones_en.json!00_LZKVJWzyNlEXy-hI3mpGnA",
  "ExportFlavour_en.json!00_ZncLtAPejPvNOCq-KayyhQ",
  "ExportFusionBundles_en.json!00_mievusFTvE1yg4jxseyL9w",
  "ExportGear_en.json!00_4dR4N93qX0d8hVBF3cFTGQ",
  "ExportKeys_en.json!00_ejrRZxo69KE2kJ5H9RtfAA",
  "ExportRecipes_en.json!00_PfGDS+9s51CjAENFDiIDeA",
  "ExportRegions_en.json!00_LwDkCjVYlvTWc0LozQroaw",
  "ExportRelicArcane_en.json!00_VOr3hNbwwZazos-HVr6+PQ",
  "ExportResources_en.json!00_HLVPCm5NzBeShq-q8dh+hg",
  "ExportSentinels_en.json!00_77HyQHJYXKRhQNFHDQDFlQ",
  "ExportSortieRewards_en.json!00_vhEG53WKxus2ogHEGP3fWw",
  "ExportUpgrades_en.json!00_4hLbuBsHeWHphpCSUnTy2Q",
  "ExportWarframes_en.json!00_SEhDH31H5ZuNUsCMx19ttQ",
  "ExportWeapons_en.json!00_x2GywzLibmHZggtRYQkeIw",
  "ExportManifest.json!00_M1J0bDB945QmWfunK2Hiqw",
];

/**
 * Fetch all the export files from the Warframe API and save them to redux state.
 */
export const fetchExports = createAsyncThunk("warframe/fetchExports", async () => {
  const fetchExportJson = async (exportName: string): Promise<unknown> => {
    const response = await fetch(`${MANIFEST_URL}${exportName}`);
    const responseText = await response.text();
    const responseTextCleaned = responseText.replace(/[\n\r]/g, "");
    const responseJson = JSON.parse(responseTextCleaned);
    return responseJson;
  };

  const exports: WarframeExports = getDefaultWarframeExport();

  await Promise.all(
    EXPORT_NAMES.map(async (exportName) => {
      const exportJson = await fetchExportJson(exportName);

      const export_key = exportName.split(".json")[0];
      switch (export_key) {
        case EXPORT_CUSTOMS_EN:
          exports[EXPORT_CUSTOMS_EN] = exportJson as ExportCustomsEn;
          break;
        case EXPORT_DRONES_EN:
          exports[EXPORT_DRONES_EN] = exportJson as ExportDronesEn;
          break;
        case EXPORT_FLAVOUR_EN:
          exports[EXPORT_FLAVOUR_EN] = exportJson as ExportFlavourEn;
          break;
        case EXPORT_FUSIONBUNDLES_EN:
          exports[EXPORT_FUSIONBUNDLES_EN] = exportJson as ExportFusionBundlesEn;
          break;
        case EXPORT_GEAR_EN:
          exports[EXPORT_GEAR_EN] = exportJson as ExportGearEn;
          break;
        case EXPORT_KEYS_EN:
          exports[EXPORT_KEYS_EN] = exportJson as ExportKeysEn;
          break;
        case EXPORT_RECIPES_EN:
          exports[EXPORT_RECIPES_EN] = exportJson as ExportRecipesEn;
          break;
        case EXPORT_REGIONS_EN:
          exports[EXPORT_REGIONS_EN] = exportJson as ExportRegionsEn;
          break;
        case EXPORT_RELICARCANE_EN:
          exports[EXPORT_RELICARCANE_EN] = exportJson as ExportRelicArcaneEn;
          break;
        case EXPORT_RESOURCES_EN:
          exports[EXPORT_RESOURCES_EN] = exportJson as ExportResourcesEn;
          break;
        case EXPORT_SENTINELS_EN:
          exports[EXPORT_SENTINELS_EN] = exportJson as ExportSentinelsEn;
          break;
        case EXPORT_SORTIEREWARDS_EN:
          exports[EXPORT_SORTIEREWARDS_EN] = exportJson as ExportSortieRewardsEn;
          break;
        case EXPORT_UPGRADES_EN:
          exports[EXPORT_UPGRADES_EN] = exportJson as ExportUpgradesEn;
          break;
        case EXPORT_WARFRAMES_EN:
          exports[EXPORT_WARFRAMES_EN] = exportJson as ExportWarframesEn;
          break;
        case EXPORT_WEAPONS_EN:
          exports[EXPORT_WEAPONS_EN] = exportJson as ExportWeaponsEn;
          break;
        case EXPORT_MANIFEST:
          exports[EXPORT_MANIFEST] = exportJson as ExportManifest;
          break;
        default:
          break;
      }
    })
  );

  return exports;
});

export interface AggregateWeaponIngredients {
  weapons: ExportWeapon[];
  recipes: ExportRecipe[];
}

export const aggregateWeaponIngredients = ({ weapons, recipes }: AggregateWeaponIngredients): Dict =>
  weapons.reduce((acc, curr) => {
    const recipe = findRecipe(curr.uniqueName, recipes);
    if (recipe === undefined) return acc;

    recipe.ingredients.forEach((ingredient) => {
      if (acc[ingredient.ItemType] === undefined) acc[ingredient.ItemType] = 0;

      acc[ingredient.ItemType] += ingredient.ItemCount;
    });

    return acc;
  }, {} as Dict);

export const warframeSlice = createSlice({
  name: "warframe",
  initialState,
  reducers: {
    aggregateUncompletedWeaponIngredients: (
      state: WarframeState,
      action: PayloadAction<AggregateWeaponIngredients>
    ) => {
      const aggregatedIngredients = aggregateWeaponIngredients(action.payload);

      state.aggregateUncompletedWeaponIngredients = Object.entries(aggregatedIngredients).map(
        ([ingredient, count]): AggregatedIngredientCount => ({
          ingredient: ingredient,
          ingredientDisplayName: ingredient.split("/").pop() || ingredient,
          count: count,
        })
      );
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchExports.pending, (state) => {
        state.warframeExportStatus = LOADING_STATE.LOADING;
      })
      .addCase(fetchExports.fulfilled, (state, action) => {
        state.warframeExportStatus = LOADING_STATE.COMPLETE;
        state.warframeExports = action.payload;
      })
      .addCase(fetchExports.rejected, (state) => {
        state.warframeExportStatus = LOADING_STATE.FAILED;
      });
  },
});

export const { aggregateUncompletedWeaponIngredients } = warframeSlice.actions;

export const selectWarframeExportStatus = (state: RootState) => state.warframe.warframeExportStatus;
export const selectWarframeExports = (state: RootState) => state.warframe.warframeExports;
export const selectAggregateUncompletedWeaponIngredients = (state: RootState) =>
  state.warframe.aggregateUncompletedWeaponIngredients;

export const warframeReducer = warframeSlice.reducer;
