export interface ExportWarframesEn {
  ExportWarframes: ExportWarframe[];
  ExportAbilities: Ability[];
}

export interface Ability {
  abilityUniqueName: string;
  abilityName: string;
  description: string;
}

export interface ExportWarframe {
  uniqueName: string;
  name: string;
  parentName: string;
  description: string;
  health: number;
  shield: number;
  armor: number;
  stamina: number;
  power: number;
  codexSecret: boolean;
  masteryReq: number;
  sprintSpeed: number;
  abilities: Ability[];
  productCategory: ProductCategory;
  passiveDescription?: string;
  exalted?: string[];
  longDescription?: string;
}

export enum ProductCategory {
  MechSuits = "MechSuits",
  SpaceSuits = "SpaceSuits",
  Suits = "Suits",
}
