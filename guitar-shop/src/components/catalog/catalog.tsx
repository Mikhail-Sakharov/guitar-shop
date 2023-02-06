import {getProducts} from '../../mocks/products';
import ProductCard from '../product-card/product-card';

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

type CatalogProps = {
  setAddToCartModalState: (state: AddToCartModalState) => void;
};

function Catalog({setAddToCartModalState}: CatalogProps): JSX.Element {
  const products = getProducts();
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
