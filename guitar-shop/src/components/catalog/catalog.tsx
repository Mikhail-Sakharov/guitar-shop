import ProductCard from '../product-card/product-card';
import {products as data} from '../app/app';
import {ProductDto} from '../../types/product.dto';

type MainPageState = {
  isAddToCartModalOpened: boolean;
  isEnterModalOpened?: boolean;
  product: ProductDto | null;
};

type CatalogProps = {
  setMainPageState: (state: MainPageState) => void;
};

function Catalog({setMainPageState}: CatalogProps): JSX.Element {
  const products = data;

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
