import {useState} from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Filter from '../../components/filter/filter';
import AddToCartModal from '../../components/modals/add-to-cart-modal/add-to-cart-modal';
import SuccessAddModal from '../../components/modals/success-add-modal/success-add-modal';
import Pagination from '../../components/pagination/pagination';
import Sort from '../../components/sort/sort';
import {ProductDto} from '../../types/product.dto';

type AddToCartModalState = {
  isAddToCartModalOpened: boolean;
  isSuccessAddModalOpened: boolean;
  product: ProductDto | null;
};

function Main(): JSX.Element {
  const addToCartModalInitialState: AddToCartModalState = {
    isAddToCartModalOpened: false,
    isSuccessAddModalOpened: false,
    product: null
  };
  const [addToCartModalState, setAddToCartModalState] = useState(addToCartModalInitialState); // TODO: переименовать

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
            addToCartModalState.isAddToCartModalOpened && <AddToCartModal product={addToCartModalState.product} setAddToCartModalState={setAddToCartModalState}/>
          }
          {
            addToCartModalState.isSuccessAddModalOpened && <SuccessAddModal setAddToCartModalState={setAddToCartModalState}/>
          }
        </div>
      </div>
    </main>
  );
}

export default Main;
