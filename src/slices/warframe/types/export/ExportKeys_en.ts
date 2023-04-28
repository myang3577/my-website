export interface ExportKeysEn {
  ExportKeys: ExportKey[];
}

export interface ExportKey {
  uniqueName: string;
  name: string;
  description: string;
  parentName: ParentName;
  codexSecret: boolean;
  excludeFromCodex?: boolean;
}

export enum ParentName {
  Empty = "",
  LotusTypesGameKeyItem = "/Lotus/Types/Game/KeyItem",
  LotusTypesKeysInfestedAladVQuestAssassinateInfestedAladVKey = "/Lotus/Types/Keys/InfestedAladVQuest/AssassinateInfestedAladVKey",
  LotusTypesKeysTestKeyA = "/Lotus/Types/Keys/TestKeyA",
}
