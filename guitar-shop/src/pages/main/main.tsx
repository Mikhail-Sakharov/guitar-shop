import {useState} from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Filter from '../../components/filter/filter';
import AddToCartModal from '../../components/modals/add-to-cart-modal/add-to-cart-modal';
import EnterModal from '../../components/modals/enter-modal/enter-modal';
import SuccessAddModal from '../../components/modals/success-add-modal/success-add-modal';
import Pagination from '../../components/pagination/pagination';
import Sort from '../../components/sort/sort';
import {ProductDto} from '../../types/product.dto';

type MainPageState = {
  isAddToCartModalOpened?: boolean;
  isSuccessAddModalOpened?: boolean;
  isEnterModalOpened?: boolean;
  product: ProductDto | null;
};

function Main(): JSX.Element {
  const mainPageInitialState: MainPageState = {
    isAddToCartModalOpened: false,
    isSuccessAddModalOpened: false,
    isEnterModalOpened: false,
    product: null
  };
  const [mainPageState, setMainPageState] = useState(mainPageInitialState);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs />
        <div className="catalog">
          <Filter />
          <Sort />
          <Catalog setMainPageState={setMainPageState}/>
          <Pagination />
          {
            mainPageState.isAddToCartModalOpened && <AddToCartModal product={mainPageState.product} setMainPageState={setMainPageState}/>
          }
          {
            mainPageState.isSuccessAddModalOpened && <SuccessAddModal setMainPageState={setMainPageState}/>
          }
          {
            mainPageState.isEnterModalOpened && <EnterModal setMainPageState={setMainPageState}/>
          }
        </div>
      </div>
    </main>
  );
}

export default Main;
