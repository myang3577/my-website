export interface ExportDronesEn {
  ExportDrones: ExportDrone[];
}

export interface ExportDrone {
  uniqueName: string;
  name: string;
  description: string;
  binCount: number;
  binCapacity: number;
  fillRate: number;
  durability: number;
  repairRate: number;
  codexSecret: boolean;
  capacityMultiplier: number[];
  specialities: unknown[];
}
