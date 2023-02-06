import ProductCard from '../product-card/product-card';
import {products as data} from '../app/app';
import {ProductDto} from '../../types/product.dto';

type AddToCartModalState = {
  isAddToCartModalOpened: boolean;
  isSuccessAddModalOpened: boolean;
  product: ProductDto | null;
};

type CatalogProps = {
  setAddToCartModalState: (state: AddToCartModalState) => void;
};

function Catalog({setAddToCartModalState}: CatalogProps): JSX.Element {
  const products = data;

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} setAddToCartModalState={setAddToCartModalState}/>
        ))
      }
    </div>
  );
}

export default Catalog;
