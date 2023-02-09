export enum SortType {
  Price = 'price',
  Rating = 'rating'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type QueryArguments = {
  page?: number;
  limit?: number;
  sort?: SortType;
  order?: SortOrder;
  guitarTypeFilter?: string;
  stringsCountFilter?: StringsCount[];
};

export type PriceFilter = {
  minPrice: number;
  maxPrice: number;
};

export enum GuitarType {
  Acoustic = 'аккустика',
  Electro = 'электро',
  Ukulele = 'укулеле'
}

export enum StringsCount {
  Four = 4,
  Six = 6,
  Seven = 7,
  Twelve = 12
}
