import {Navigate, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
// import {useAppSelector} from '../../hooks';
import AddItem from '../../pages/add-item/add-item';
import Cart from '../../pages/cart/cart';
import EditItem from '../../pages/edit-item/edit-item';
import NotFound from '../../pages/error-404/error-404';
// import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Order from '../../pages/order/order';
import Orders from '../../pages/orders/orders';
import ProductList from '../../pages/product-list/product-list';
import Product from '../../pages/product/product';
import Registration from '../../pages/registration/registration';
// import {getDataLoadedStatus} from '../../store/app-data/selectors';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';

export function useApppSelector() {
  return AuthorizationStatus.Auth;
}

function App(): JSX.Element {
  const authorizationStatus = useApppSelector(); // временный фейковый селектор !
  // const isDataLoaded = useAppSelector(getDataLoadedStatus);

  /* if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  } */

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route index element={<Main />}/>
        <Route
          path={AppRoute.Login}
          element={
            authorizationStatus !== AuthorizationStatus.Auth
              ? <Login />
              : <Navigate to={AppRoute.Main}/>
          }
        />
        <Route
          path={AppRoute.Registration}
          element={
            authorizationStatus !== AuthorizationStatus.Auth
              ? <Registration />
              : <Navigate to={AppRoute.Main}/>
          }
        />
        <Route path={AppRoute.ProductId} element={<Product />}/>
        <Route path={AppRoute.Products} element={<ProductList />}/>
        <Route
          path={AppRoute.Cart}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.AddItem} element={<AddItem />}/>
        <Route path={AppRoute.EditItem} element={<EditItem />}/>
        <Route path={AppRoute.Order} element={<Order />}/>
        <Route path={AppRoute.Orders} element={<Orders />}/>
        <Route path={AppRoute.NotFound} element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
