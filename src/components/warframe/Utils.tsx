import { ExportManifest } from "../../slices/warframe/types/export/ExportManifest";

const IMAGE_BASE_URL = "https://content.warframe.com/PublicExport/";

export const getImageUrl = (textureLocation: string): string => `${IMAGE_BASE_URL}${textureLocation}`;

export const getImage = (item: string, exportManifest: ExportManifest): string => {
  const textureLocation = exportManifest.Manifest.find((e) => e.uniqueName === item)?.textureLocation;

  if (textureLocation) {
    return getImageUrl(textureLocation);
  }

  return "/Lotus/Interface/Icons/StoreIcons/Cosmetics/Syandanas/VanquishedBanner.png!00_tRfVpDeIxYKopXuvOIooOg";
};

export const getWikiLink = (name: string) => {
  if (name.includes("<ARCHWING>")) name = name.replace("<ARCHWING>", "").trim();

  return `https://warframe.fandom.com/wiki/${name}#Acquisition`;
};
