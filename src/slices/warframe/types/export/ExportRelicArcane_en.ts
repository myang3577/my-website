export interface ExportRelicArcaneEn {
  ExportRelicArcane: ExportRelicArcane[];
}

export interface ExportRelicArcane {
  uniqueName: string;
  name: string;
  codexSecret: boolean;
  description?: string;
  relicRewards?: RelicReward[];
  excludeFromCodex?: boolean;
  rarity?: ExportRelicArcaneRarity;
  levelStats?: LevelStat[];
}

export interface LevelStat {
  stats: string[];
}

export enum ExportRelicArcaneRarity {
  Legendary = "LEGENDARY",
  Rare = "RARE",
  Uncommon = "UNCOMMON",
}

export interface RelicReward {
  rewardName: string;
  rarity: RelicRewardRarity;
  tier: number;
  itemCount: number;
}

export enum RelicRewardRarity {
  Common = "COMMON",
  Rare = "RARE",
  Uncommon = "UNCOMMON",
}
