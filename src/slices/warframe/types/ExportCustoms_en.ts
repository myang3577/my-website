export interface ExportCustomsEn {
  ExportCustoms: ExportCustom[];
}

export interface ExportCustom {
  uniqueName: string;
  name: string;
  codexSecret: boolean;
  description?: string;
  excludeFromCodex?: boolean;
}
