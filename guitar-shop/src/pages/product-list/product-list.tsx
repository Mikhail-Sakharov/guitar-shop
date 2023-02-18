import { Link } from 'react-router-dom';
import Catalog from '../../components/catalog/catalog';
import Filter from '../../components/filter/filter';
import Pagination from '../../components/pagination/pagination';
import Sort from '../../components/sort/sort';

function ProductList(): JSX.Element {
  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/">Товары</Link>
            </li>
          </ul>
          <div className="catalog">
            <Filter />
            <Sort />
            <Catalog />
          </div>
          <button className="button product-list__button button--red button--big">Добавить новый товар</button>
          <Pagination />
        </div>
      </section>
    </main>
  );
}

export default ProductList;
