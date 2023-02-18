import {Navigate, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import AddItem from '../../pages/add-item/add-item';
import Cart from '../../pages/cart/cart';
import EditItem from '../../pages/edit-item/edit-item';
import NotFound from '../../pages/error-404/error-404';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Order from '../../pages/order/order';
import Orders from '../../pages/orders/orders';
import ProductList from '../../pages/product-list/product-list';
import Product from '../../pages/product/product';
import Registration from '../../pages/registration/registration';
import {getUserRole} from '../../services/user-role';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import AdminRoute from '../admin-route/admin-route';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userRole = getUserRole();

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
          element={<Registration />}
        />
        <Route path={AppRoute.ProductId} element={<Product />}/>
        <Route
          path={AppRoute.Cart}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Products}
          element={
            <AdminRoute userRole={userRole}>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path={AppRoute.AddItem}
          element={
            <AdminRoute userRole={userRole}>
              <AddItem />
            </AdminRoute>
          }
        />
        <Route
          path={AppRoute.EditItem}
          element={
            <AdminRoute userRole={userRole}>
              <EditItem />
            </AdminRoute>
          }
        />
        <Route
          path={AppRoute.Order}
          element={
            <AdminRoute userRole={userRole}>
              <Order />
            </AdminRoute>
          }
        />
        <Route
          path={AppRoute.Orders}
          element={
            <AdminRoute userRole={userRole}>
              <Orders />
            </AdminRoute>
          }
        />

        <Route path={AppRoute.NotFound} element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
