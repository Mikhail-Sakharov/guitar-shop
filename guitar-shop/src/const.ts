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
  Order = '/order/:id',
  Orders = '/orders',
  NotFound = '*'
}

export enum APIRoute {
  Products = '/products',
  Reviews = '/reviews',
  CheckAuth = '/users/checkAuth',
  Register = '/users/register',
  Login = '/users/login',
  Orders = '/orders'
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

export const ORDERS_LIMIT = 9;

export const FILTER_QUERY_DELAY = 1000;

export const EMAIL_REG_EXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const PRODUCT_IMAGE_PATH_REG_EXP = /.+(?=.png)/;
