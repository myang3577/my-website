export interface ExportGearEn {
  ExportGear: ExportGear[];
}

export interface ExportGear {
  uniqueName: string;
  name: string;
  description: string;
  codexSecret: boolean;
  parentName: string;
}
