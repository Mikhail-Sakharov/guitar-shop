import {Link} from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import {useAppSelector} from '../../hooks';
import {getCart} from '../../store/app-data/selectors';

function Cart(): JSX.Element {
  const cart = useAppSelector(getCart);
  const totalCartPrice = cart.totalCartPrice;

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Главная</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Каталог</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Корзина</Link>
          </li>
        </ul>
        <div className="cart">
          {
            cart.items.map((cartItem) => (
              <CartItem
                key={cartItem.product?.id}
                cartItem={cartItem}
              />
            ))
          }
          <div className="cart__footer">
            <div className="cart__total-info">
              <p className="cart__total-item">
                <span className="cart__total-value-name">Всего:</span>
                <span className="cart__total-value">{totalCartPrice.toLocaleString()} ₽</span>
              </p>
              <p className="cart__total-item">
                <span className="cart__total-value-name">К оплате:</span>
                <span className="cart__total-value cart__total-value--payment">{totalCartPrice.toLocaleString()} ₽</span>
              </p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
