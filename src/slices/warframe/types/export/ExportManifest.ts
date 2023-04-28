export interface ExportManifest {
  Manifest: Manifest[];
}

export interface Manifest {
  textureLocation: string;
  uniqueName: string;
}
