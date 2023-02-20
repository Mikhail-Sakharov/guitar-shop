import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import OrderItem from '../../components/order-item/order-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOrderAction} from '../../store/api-actions';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {getOrder} from '../../store/app-data/selectors';

function Order(): JSX.Element {
  const dispatch = useAppDispatch();

  const orderId = useParams().id;
  const order = useAppSelector(getOrder);

  useEffect(() => {
    dispatch(setDataLoadedStatus(true));
    dispatch(fetchOrderAction(orderId));
  }, [dispatch, orderId]);

  return (
    <main className="page-content">
      <section className="order">
        <div className="container">
          <h1 className="order__title">Заказ № {order?.orderNumber}</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/orders"> Заказы</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/order/:id">Заказ № {order?.orderNumber}</Link>
            </li>
          </ul>
          <table className="order-table">
            <tbody>
              <tr>
                <td>Общее количество товаров</td>
                <td>{order?.items.length}</td>
              </tr>
              <tr>
                <td>Дата заказа</td>
                <td>{order?.createdAt}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>К оплате</td>
                <td>{order?.totalOrderPrice} <span>₽</span></td>
              </tr>
            </tfoot>
          </table>
          <ul className="order__list order-list">
            {
              order?.items.map((orderItem) => (
                <OrderItem orderItem={orderItem}/>
              ))
            }
          </ul>
          <button className="button order__button button--small button--black-border">Вернуться к списку заказов</button>
        </div>
      </section>
    </main>
  );
}

export default Order;
