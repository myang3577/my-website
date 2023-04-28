export interface ExportFusionBundlesEn {
  ExportFusionBundles: ExportFusionBundle[];
}

export interface ExportFusionBundle {
  uniqueName: string;
  description: Description;
  codexSecret: boolean;
  fusionPoints: number;
}

export enum Description {
  ConsumedInTheFusionProcessToPowerUpExistingMods = "Consumed in the fusion process to power up existing Mods.",
  ConsumedToUpgradeTheRailjackGridAndAvionics = "Consumed to upgrade the Railjack Grid and Avionics.",
}
