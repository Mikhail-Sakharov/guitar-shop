import {ProductDto} from './product.dto';

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
  minPriceFilter?: string;
  maxPriceFilter?: string;
  guitarTypeFilter?: string;
  stringsCountFilter?: string;
};

export type GetReviewsQueryArguments = {
  productId: string | undefined;
  page?: number;
  limit?: number;
  sort?: SortType;
  order?: SortOrder;
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

export type CartItemType = {
  product: ProductDto | null;
  quantity: number;
  totalItemPrice: number;
};

export type CartType = {
  items: CartItemType[];
  totalCartPrice: number;
};
