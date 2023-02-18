import ProductCard from '../product-card/product-card';
import {ProductDto} from '../../types/product.dto';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProducts} from '../../store/app-data/selectors';
import {useEffect} from 'react';
import {clearReviews} from '../../store/app-data/app-data';
import {useLocation} from 'react-router-dom';
import AdminProductCard from '../admin-product-card/admin-product-card';

type MainPageState = {
  isAddToCartModalOpened: boolean;
  isEnterModalOpened?: boolean;
  product: ProductDto | null;
};

type CatalogProps = {
  setMainPageState?: (state: MainPageState) => void;
};

function Catalog({setMainPageState}: CatalogProps): JSX.Element {
  const currentPath = useLocation().pathname;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearReviews([]));
  }, [dispatch]);

  const products = useAppSelector(getProducts);

  return (
    <div className={`catalog__cards ${currentPath === '/' ? 'cards' : ''}`}>
      {
        currentPath === '/'
        ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} setMainPageState={setMainPageState}/>
          ))
        )
        : (
          products.map((product) => (
            <ul className="catalog-cards__list">
              <AdminProductCard product={product}/>
            </ul>
          ))
        )
      }
    </div>
  );
}

export default Catalog;
