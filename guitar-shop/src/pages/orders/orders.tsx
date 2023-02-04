import { Link } from 'react-router-dom';

function Orders(): JSX.Element {
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
          <div className="catalog-sort">
            <h2 className="catalog-sort__title">Сортировать:</h2>
            <div className="catalog-sort__type">
              <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по дате">по дате</button>
              <button className="catalog-sort__type-button" aria-label="по цене">по цене</button>
            </div>
            <div className="catalog-sort__order">
              <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию"></button>
              <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
            </div>
          </div>
          <ul className="orders__list">
            <li className="orders__item">
              <h3 className="orders__number">Заказ №00-000-000</h3>
              <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span>
              <span className="orders__date">13.09.2022</span>
              <b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
              <button className="button button--small orders__remove-button" type="button">Удалить</button>
            </li>
            <li className="orders__item">
              <h3 className="orders__number">Заказ №00-000-000</h3>
              <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span>
              <span className="orders__date">13.09.2022</span>
              <b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
              <button className="button button--small orders__remove-button" type="button">Удалить</button>
            </li>
            <li className="orders__item">
              <h3 className="orders__number">Заказ №00-000-000</h3>
              <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span>
              <span className="orders__date">13.09.2022</span>
              <b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
              <button className="button button--small orders__remove-button" type="button">Удалить</button>
            </li>
            <li className="orders__item">
              <h3 className="orders__number">Заказ №00-000-000</h3>
              <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span>
              <span className="orders__date">13.09.2022</span>
              <b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
              <button className="button button--small orders__remove-button" type="button">Удалить</button>
            </li>
            <li className="orders__item">
              <h3 className="orders__number">Заказ №00-000-000</h3>
              <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span>
              <span className="orders__date">13.09.2022</span>
              <b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
              <button className="button button--small orders__remove-button" type="button">Удалить</button>
            </li>
            <li className="orders__item">
              <h3 className="orders__number">Заказ №00-000-000</h3>
              <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span>
              <span className="orders__date">13.09.2022</span>
              <b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
              <button className="button button--small orders__remove-button" type="button">Удалить</button>
            </li>
          </ul>
          <div className="pagination orders__pagination">
            <ul className="pagination__list">
              <li className="pagination__page pagination__page--active">
                <Link className="link pagination__page-link" to="1">1</Link>
              </li>
              <li className="pagination__page">
                <Link className="link pagination__page-link" to="2">2</Link>
              </li>
              <li className="pagination__page">
                <Link className="link pagination__page-link" to="3">3</Link>
              </li>
              <li className="pagination__page pagination__page--next" id="next">
                <Link className="link pagination__page-link" to="2">Далее</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Orders;
