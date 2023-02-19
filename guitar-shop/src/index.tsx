import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import {store} from './store';
import {checkAuthAction, fetchOrdersAction, fetchProductsAction} from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import {DEFAULT_PAGE_NUMBER, ORDERS_LIMIT, PRODUCTS_LIMIT} from './const';
import {setDataLoadedStatus} from './store/app-data/app-data';
import {getUserRole} from './services/user-role';
import {UserRole} from './types/user-role.enum';

const userRole = getUserRole();
store.dispatch(checkAuthAction());
store.dispatch(fetchProductsAction({page: DEFAULT_PAGE_NUMBER, limit: PRODUCTS_LIMIT}));
store.dispatch(setDataLoadedStatus(true));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer limit={1}/>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
