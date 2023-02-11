import ProductCard from '../product-card/product-card';
import {ProductDto} from '../../types/product.dto';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProducts} from '../../store/app-data/selectors';
import {useEffect} from 'react';
import {clearReviews} from '../../store/app-data/app-data';

type MainPageState = {
  isAddToCartModalOpened: boolean;
  isEnterModalOpened?: boolean;
  product: ProductDto | null;
};

type CatalogProps = {
  setMainPageState: (state: MainPageState) => void;
};

function Catalog({setMainPageState}: CatalogProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearReviews([]));
  }, [dispatch]);

  const products = useAppSelector(getProducts);

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} setMainPageState={setMainPageState}/>
        ))
      }
    </div>
  );
}

export default Catalog;
