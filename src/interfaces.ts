export interface Types {
  [key: string]: Item[];
}

export interface Item {
  type: string;
  name: string;
  lowPrice: number;
  highPrice: number;
}

export interface PriceRange {
  lowPrice: number;
  highPrice: number;
}
