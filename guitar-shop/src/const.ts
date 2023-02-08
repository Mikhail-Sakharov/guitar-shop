export enum AppRoute {
  Main = '/',
  Login = '/login',
  Registration = '/registration',
  Product = '/product',
  ProductId = '/product/:id',
  Products = '/products',
  Cart = '/cart',
  AddItem = '/add-item',
  EditItem = '/edit-item',
  Order = '/order/:id', // /order/:id
  Orders = '/orders',
  NotFound = '*'
}

export enum APIRoute {
  Products = '/products',
  Reviews = '/reviews'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER'
}

export const ratings = ['Не определено', 'Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export const MAX_RATING_STARS_COUNT = 5;

export const DEFAULT_PAGE_NUMBER = 1;

export const PRODUCTS_LIMIT = 9;
