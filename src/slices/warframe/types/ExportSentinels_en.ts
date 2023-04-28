export interface ExportSentinelsEn {
  ExportSentinels: ExportSentinel[];
}

export interface ExportSentinel {
  uniqueName: string;
  name: string;
  health: number;
  shield: number;
  armor: number;
  stamina: number;
  power: number;
  codexSecret: boolean;
  excludeFromCodex?: boolean;
  description: string;
  productCategory: ProductCategory;
}

export enum ProductCategory {
  KubrowPets = "KubrowPets",
  Sentinels = "Sentinels",
  SpecialItems = "SpecialItems",
}
