import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import OrderCard from '../../components/order-card/order-card';
import Pagination from '../../components/pagination/pagination';
import Sort from '../../components/sort/sort';
import {DEFAULT_PAGE_NUMBER, ORDERS_LIMIT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOrdersAction} from '../../store/api-actions';
import {changeActiveOrdersPageAction, changeSortOrderAction, changeSortTypeAction} from '../../store/app-data/app-data';
import {getOrders} from '../../store/app-data/selectors';
import {SortOrder, SortType} from '../../types/common';

function Orders(): JSX.Element {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);

  const refreshOrdersPage = () => {
    dispatch(fetchOrdersAction({page: DEFAULT_PAGE_NUMBER, limit: ORDERS_LIMIT, sort: SortType.Date}));
    dispatch(changeSortTypeAction(SortType.Date));
    dispatch(changeSortOrderAction(SortOrder.Asc));
    dispatch(changeActiveOrdersPageAction(DEFAULT_PAGE_NUMBER));
  };

  useEffect(() => {
    refreshOrdersPage();
  }, []);

  return (
    <main className="page-content orders__main">
      <section className="orders">
        <div className="container">
          <h1 className="title title--bigger orders__title">Список заказов</h1>
          <ul className="breadcrumbs orders__breadcrumps">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/orders"> Заказы</Link>
            </li>
          </ul>
          <Sort />
          <ul className="orders__list">
            {
              orders.map((order) => (
                <OrderCard key={order.id}
                  order={order}
                  refreshPage={refreshOrdersPage}
                />
              ))
            }
          </ul>
          <Pagination />
        </div>
      </section>
    </main>
  );
}

export default Orders;
