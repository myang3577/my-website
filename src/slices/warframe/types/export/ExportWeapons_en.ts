export interface ExportWeaponsEn {
  ExportWeapons: ExportWeapon[];
  ExportRailjackWeapons: ExportRailjackWeapon[];
}

export interface ExportRailjackWeapon {
  name: string;
  uniqueName: string;
  codexSecret: boolean;
  damagePerShot: number[];
  totalDamage: number;
  description: string;
  criticalChance: number;
  criticalMultiplier: number;
  procChance: number;
  fireRate: number;
  masteryReq: number;
  productCategory: ExportRailjackWeaponProductCategory;
  excludeFromCodex: boolean;
  slot: number;
  accuracy: number;
  omegaAttenuation: number;
  noise: Noise;
  trigger: Trigger;
  magazineSize: number;
  reloadTime: number;
  multishot: number;
}

export enum Noise {
  Alarming = "ALARMING",
  Silent = "SILENT",
}

export enum ExportRailjackWeaponProductCategory {
  CrewShipWeapons = "CrewShipWeapons",
}

export enum Trigger {
  Active = "ACTIVE",
  Auto = "AUTO",
  AutoBurst = "Auto Burst",
  Burst = "BURST",
  Charge = "CHARGE",
  Duplex = "DUPLEX",
  Held = "HELD",
  Semi = "SEMI",
}

export interface ExportWeapon {
  name: string;
  uniqueName: string;
  codexSecret: boolean;
  damagePerShot: number[];
  totalDamage: number;
  description: string;
  criticalChance: number;
  criticalMultiplier: number;
  procChance: number;
  fireRate: number;
  masteryReq: number;
  productCategory: ExportWeaponProductCategory;
  slot?: number;
  accuracy?: number;
  omegaAttenuation: number;
  noise?: Noise;
  trigger?: Trigger;
  magazineSize?: number;
  reloadTime?: number;
  multishot?: number;
  blockingAngle?: number;
  comboDuration?: number;
  followThrough?: number;
  range?: number;
  slamAttack?: number;
  slamRadialDamage?: number;
  slamRadius?: number;
  slideAttack?: number;
  heavyAttackDamage?: number;
  heavySlamAttack?: number;
  heavySlamRadialDamage?: number;
  heavySlamRadius?: number;
  windUp?: number;
  maxLevelCap?: number;
  sentinel?: boolean;
  excludeFromCodex?: boolean;
  primeOmegaAttenuation?: number;
}

export enum ExportWeaponProductCategory {
  LongGuns = "LongGuns",
  Melee = "Melee",
  OperatorAmps = "OperatorAmps",
  Pistols = "Pistols",
  SentinelWeapons = "SentinelWeapons",
  SpaceGuns = "SpaceGuns",
  SpaceMelee = "SpaceMelee",
  SpecialItems = "SpecialItems",
}
