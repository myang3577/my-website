export interface TftMetasrc {
  name: string;
  path: string;
  tier: string;
  image: string;
  "search-terms": string;
  category: Category;
  title: string;
  game: Game;
  key?: string;
  traits?: string[];
}

export enum Category {
  Augment = "Augment",
  Champion = "Champion",
  Comp = "Comp",
  Item = "Item",
  Trait = "Trait",
}

export enum Game {
  TFT = "tft",
}
