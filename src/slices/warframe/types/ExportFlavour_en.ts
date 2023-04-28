export interface ExportFlavourEn {
  ExportFlavour: ExportFlavour[];
}

export interface ExportFlavour {
  uniqueName: string;
  name: string;
  description: string;
  codexSecret: boolean;
  excludeFromCodex?: boolean;
  hexColours?: HexColour[];
}

export interface HexColour {
  value: string;
}
