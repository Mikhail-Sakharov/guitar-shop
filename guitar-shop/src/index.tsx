import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import {DEFAULT_PAGE_NUMBER, PRODUCTS_LIMIT} from './const';
import {store} from './store';
import {checkAuthAction, fetchProductsAction} from './store/api-actons';
import {setDataLoadedStatus} from './store/app-data/app-data';

store.dispatch(checkAuthAction());
// store.dispatch(fetchProductsAction({page: DEFAULT_PAGE_NUMBER, limit: PRODUCTS_LIMIT}));
// store.dispatch(setDataLoadedStatus(true));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
