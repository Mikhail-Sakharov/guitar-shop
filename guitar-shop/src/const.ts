export enum AppRoute {
  Main = '/',
  Login = '/login',
  Registration = '/registration',
  Product = '/product', // /product/:id
  Products = '/products',
  Cart = '/cart',
  AddItem = '/add-item',
  EditItem = '/edit-item',
  Order = '/order', // /order/:id
  Orders = '/orders',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}