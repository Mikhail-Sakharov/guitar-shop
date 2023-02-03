import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import Layout from '../layout/layout';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Main />}/>
          <Route path={'login'} element={<Login />}/>
          <Route path={'registration'} element={<Registration />}/>
          <Route path={'product'} element={<Product />}/>
          <Route path={'products'} element={<ProductList />}/>
          <Route path={'cart'} element={<Cart />}/>
          <Route path={'add-item'} element={<AddItem />}/>
          <Route path={'edit-item'} element={<EditItem />}/>
          <Route path={'order'} element={<Order />}/>
          <Route path={'orders'} element={<Orders />}/>
          <Route path={'*'} element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
