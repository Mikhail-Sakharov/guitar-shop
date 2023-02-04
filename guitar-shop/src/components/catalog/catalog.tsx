import {getProducts} from '../../mocks/products';
import ProductCard from '../product-card/product-card';

function Catalog() {
  const products = getProducts();
  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))
      }
    </div>
  );
}

export default Catalog;
