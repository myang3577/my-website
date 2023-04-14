export interface TradeFetchResult {
  id: string;
  listing: Listing;
  item: Item;
}

export interface Item {
  verified: boolean;
  w: number;
  h: number;
  icon: string;
  league: string;
  id: string;
  name: string;
  typeLine: string;
  baseType: string;
  identified: boolean;
  ilvl: number;
  note: string;
  flavourText: string[];
  frameType: number;
  extended: Extended;
}

export interface Extended {
  text: string;
}

export interface Listing {
  method: string;
  indexed: Date;
  stash: Stash;
  whisper: string;
  account: Account;
  price: Price;
}

export interface Account {
  name: string;
  online: Online;
  lastCharacterName: string;
  language: string;
  realm: string;
}

export interface Online {
  league: string;
}

export interface Price {
  type: string;
  amount: number;
  currency: string;
}

export interface Stash {
  name: string;
  x: number;
  y: number;
}
