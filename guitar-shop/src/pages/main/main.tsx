import {useState} from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Filter from '../../components/filter/filter';
import AddToCartModal from '../../components/modals/add-to-cart-modal/add-to-cart-modal';
import Pagination from '../../components/pagination/pagination';
import Sort from '../../components/sort/sort';

class ProductDto { // TODO: перенести в типы
  public id!: number;
  public title!: string;
  public description!: string;
  public createdAt!: string;
  public image!: string;
  public guitarType!: string;
  public sku!: string;
  public stringsCount!: number;
  public rating!: number;
  public price!: number;
  public reviewsCount!: number;
}

type AddToCartModalState = {
  isOpened: boolean;
  product: ProductDto | null;
};

function Main(): JSX.Element {
  const addToCartModalInitialState: AddToCartModalState = {
    isOpened: false,
    product: null
  };
  const [addToCartModalState, setAddToCartModalState] = useState(addToCartModalInitialState);
  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs />
        <div className="catalog">
          <Filter />
          <Sort />
          <Catalog setAddToCartModalState={setAddToCartModalState}/>
          <Pagination />
          {
            addToCartModalState.isOpened && <AddToCartModal product={addToCartModalState.product} setAddToCartModalState={setAddToCartModalState}/>
          }
        </div>
      </div>
    </main>
  );
}

export default Main;
