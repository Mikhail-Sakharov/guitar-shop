import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Filter from '../../components/filter/filter';
import Pagination from '../../components/pagination/pagination';
import Sort from '../../components/sort/sort';

function Main(): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs />
        <div className="catalog">
          <Filter />
          <Sort />
          <Catalog />
          <Pagination />
        </div>
      </div>
    </main>
  );
}

export default Main;
