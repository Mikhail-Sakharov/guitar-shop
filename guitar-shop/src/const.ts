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
