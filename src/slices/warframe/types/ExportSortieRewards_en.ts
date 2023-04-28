export interface ExportSortieRewardsEn {
  ExportSortieRewards: ExportSortieReward[];
  ExportNightwave: ExportNightwave;
  ExportRailjack: ExportRailjack;
  ExportIntrinsics: ExportIntrinsic[];
  ExportOther: ExportOther[];
}

export interface ExportIntrinsic {
  name: string;
  ranks: Rank[];
}

export interface Rank {
  name: string;
  description: string;
}

export interface ExportNightwave {
  affiliationTag: string;
  challenges: Challenge[];
  rewards: Reward[];
}

export interface Challenge {
  uniqueName: string;
  name: string;
  description: string;
  standing: number;
  required: number;
}

export interface Reward {
  uniqueName: string;
  itemCount?: number;
  name?: string;
  description?: string;
  components?: string[];
}

export interface ExportOther {
  uniqueName: string;
  name: string;
  description: string;
  excludeFromCodex?: boolean;
}

export interface ExportRailjack {
  nodes: Node[];
}

export interface Node {
  uniqueName: string;
  name: string;
}

export interface ExportSortieReward {
  rewardName: string;
  rarity: Rarity;
  tier: number;
  itemCount: number;
  probability: number;
}

export enum Rarity {
  Common = "COMMON",
}
