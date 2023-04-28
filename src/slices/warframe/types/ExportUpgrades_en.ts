export interface ExportUpgradesEn {
  ExportUpgrades: ExportUpgrade[];
  ExportModSet: ExportModSet[];
  ExportAvionics: Export[];
  ExportFocusUpgrades: Export[];
}

export interface Export {
  uniqueName: string;
  name: string;
  polarity: Polarity;
  rarity: Rarity;
  codexSecret: boolean;
  baseDrain: number;
  fusionLimit: number;
  levelStats?: LevelStat[];
  excludeFromCodex?: boolean;
}

export interface LevelStat {
  stats: string[];
}

export enum Polarity {
  ApAttack = "AP_ATTACK",
  ApDefense = "AP_DEFENSE",
  ApPower = "AP_POWER",
  ApPrecept = "AP_PRECEPT",
  ApTactic = "AP_TACTIC",
  ApUmbra = "AP_UMBRA",
  ApUniversal = "AP_UNIVERSAL",
  ApWard = "AP_WARD",
}

export enum Rarity {
  Common = "COMMON",
  Legendary = "LEGENDARY",
  Rare = "RARE",
  Uncommon = "UNCOMMON",
}

export interface ExportModSet {
  uniqueName: string;
  numUpgradesInSet: number;
  stats: string[];
  buffSet?: boolean;
}

export interface ExportUpgrade {
  uniqueName: string;
  name: string;
  polarity: Polarity;
  rarity: Rarity;
  codexSecret: boolean;
  baseDrain: number;
  fusionLimit: number;
  compatName?: string;
  type?: Type;
  description?: string[];
  isUtility?: boolean;
  levelStats?: LevelStat[];
  modSet?: string;
  modSetValues?: number[];
  subtype?: string;
  excludeFromCodex?: boolean;
  upgradeEntries?: UpgradeEntry[];
  availableChallenges?: AvailableChallenge[];
}

export interface AvailableChallenge {
  fullName: string;
  description: string;
  complications: Complication[];
}

export interface Complication {
  fullName: FullName;
  description: Description;
  overrideTag?: string;
}

export enum Description {
  InOneDay = "in one day",
  WhileAimGlide = "while Aim Glide",
  WhileAloneOrInSoloMode = ", while alone or in Solo Mode",
  WhileInvisible = "while invisible",
  WhileSliding = "while sliding",
  WhileUndetected = "while undetected",
  WithABleedingDragonKeyEquipped = "with a Bleeding Dragon Key equipped",
  WithADecayingDragonKeyEquipped = "with a Decaying Dragon Key equipped",
  WithAHobbledDragonKeyEquipped = "with a Hobbled Dragon Key equipped",
  WithAnActivePetPresent = "with an active pet present",
  WithAnActiveSentinelPresent = "with an active sentinel present",
  WithAnExtinguishedDragonKeyEquipped = "with an Extinguished Dragon Key equipped",
  WithoutAnAllyBecomingDowned = "without an ally becoming downed",
  WithoutBeingDisruptedByADTMAGNETICMagneticDamage = "without being disrupted by a <DT_MAGNETIC>Magnetic Damage",
  WithoutDyingOrBecomingDowned = "without dying or becoming downed",
  WithoutFailingAMission = "without failing a mission",
  WithoutGettingAfflictedByAStatusEffect = "without getting afflicted by a Status Effect",
  WithoutRaisingAnyAlarms = "without raising any alarms",
  WithoutTakingDamage = "without taking damage",
  WithoutUsingAirSupport = "without using air support",
  WithoutUsingAmmoConsumables = "without using ammo consumables",
  WithoutUsingCiphers = "without using ciphers",
  WithoutUsingEnergyConsumables = "without using energy consumables",
  WithoutUsingHealthConsumables = "without using health consumables",
  WithoutUsingShieldRestoringConsumables = "without using shield-restoring consumables",
}

export enum FullName {
  LotusTypesChallengesComplicationsAimGliding = "/Lotus/Types/Challenges/Complications/AimGliding",
  LotusTypesChallengesComplicationsEquippedDamageDebuffKey = "/Lotus/Types/Challenges/Complications/EquippedDamageDebuffKey",
  LotusTypesChallengesComplicationsEquippedHealthDebuffKey = "/Lotus/Types/Challenges/Complications/EquippedHealthDebuffKey",
  LotusTypesChallengesComplicationsEquippedShieldDebuffKey = "/Lotus/Types/Challenges/Complications/EquippedShieldDebuffKey",
  LotusTypesChallengesComplicationsEquippedSpeedDebuffKey = "/Lotus/Types/Challenges/Complications/EquippedSpeedDebuffKey",
  LotusTypesChallengesComplicationsInvisible = "/Lotus/Types/Challenges/Complications/Invisible",
  LotusTypesChallengesComplicationsPetPresent = "/Lotus/Types/Challenges/Complications/PetPresent",
  LotusTypesChallengesComplicationsResetOnAlarmRaised = "/Lotus/Types/Challenges/Complications/ResetOnAlarmRaised",
  LotusTypesChallengesComplicationsResetOnAllyDowned = "/Lotus/Types/Challenges/Complications/ResetOnAllyDowned",
  LotusTypesChallengesComplicationsResetOnDamageTaken = "/Lotus/Types/Challenges/Complications/ResetOnDamageTaken",
  LotusTypesChallengesComplicationsResetOnDisrupt = "/Lotus/Types/Challenges/Complications/ResetOnDisrupt",
  LotusTypesChallengesComplicationsResetOnDowned = "/Lotus/Types/Challenges/Complications/ResetOnDowned",
  LotusTypesChallengesComplicationsResetOnGearAirSupport = "/Lotus/Types/Challenges/Complications/ResetOnGearAirSupport",
  LotusTypesChallengesComplicationsResetOnGearAmmoRestores = "/Lotus/Types/Challenges/Complications/ResetOnGearAmmoRestores",
  LotusTypesChallengesComplicationsResetOnGearCipher = "/Lotus/Types/Challenges/Complications/ResetOnGearCipher",
  LotusTypesChallengesComplicationsResetOnGearEnergyRestores = "/Lotus/Types/Challenges/Complications/ResetOnGearEnergyRestores",
  LotusTypesChallengesComplicationsResetOnGearHealthRestores = "/Lotus/Types/Challenges/Complications/ResetOnGearHealthRestores",
  LotusTypesChallengesComplicationsResetOnGearShieldRestores = "/Lotus/Types/Challenges/Complications/ResetOnGearShieldRestores",
  LotusTypesChallengesComplicationsResetOnMissionFailure = "/Lotus/Types/Challenges/Complications/ResetOnMissionFailure",
  LotusTypesChallengesComplicationsResetOnNewDay = "/Lotus/Types/Challenges/Complications/ResetOnNewDay",
  LotusTypesChallengesComplicationsResetOnProc = "/Lotus/Types/Challenges/Complications/ResetOnProc",
  LotusTypesChallengesComplicationsSentinelPresent = "/Lotus/Types/Challenges/Complications/SentinelPresent",
  LotusTypesChallengesComplicationsSliding = "/Lotus/Types/Challenges/Complications/Sliding",
  LotusTypesChallengesComplicationsSoloPlayer = "/Lotus/Types/Challenges/Complications/SoloPlayer",
  LotusTypesChallengesComplicationsUndetected = "/Lotus/Types/Challenges/Complications/Undetected",
}

export enum Type {
  ArchGun = "ARCH-GUN",
  ArchMelee = "ARCH-MELEE",
  Archwing = "ARCHWING",
  Aura = "AURA",
  Empty = "---",
  HelminthCharger = "HELMINTH CHARGER",
  Kavat = "KAVAT",
  Kubrow = "KUBROW",
  Melee = "MELEE",
  Parazon = "PARAZON",
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
  Sentinel = "SENTINEL",
  Stance = "STANCE",
  Warframe = "WARFRAME",
}

export interface UpgradeEntry {
  tag: string;
  prefixTag: string;
  suffixTag: string;
  upgradeValues: UpgradeValue[];
}

export interface UpgradeValue {
  value: number;
  locTag?: string;
  reverseValueSymbol?: boolean;
}
