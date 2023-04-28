export interface ExportResourcesEn {
  ExportResources: ExportResource[];
}

export interface ExportResource {
  uniqueName: string;
  name: string;
  description: string;
  codexSecret: boolean;
  parentName: string;
  excludeFromCodex?: boolean;
  showInInventory?: boolean;
  longDescription?: string;
  primeSellingPrice?: number;
}
