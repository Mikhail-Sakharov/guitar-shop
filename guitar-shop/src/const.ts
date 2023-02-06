export enum AppRoute {
  Main = '/',
  Login = '/login',
  Registration = '/registration',
  Product = '/product/:id', // /product/:id
  Products = '/products',
  Cart = '/cart',
  AddItem = '/add-item',
  EditItem = '/edit-item',
  Order = '/order/:id', // /order/:id
  Orders = '/orders',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const ratings = ['Не определено', 'Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export const MAX_RATING_STARS_COUNT = 5;
