export interface ExportRegionsEn {
  ExportRegions: ExportRegion[];
}

export interface ExportRegion {
  uniqueName: string;
  name: string;
  systemIndex: number;
  systemName: string;
  nodeType: number;
  masteryReq: number;
  missionIndex: number;
  factionIndex: number;
  minEnemyLevel: number;
  maxEnemyLevel: number;
}
