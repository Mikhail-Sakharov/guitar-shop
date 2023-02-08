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
};
