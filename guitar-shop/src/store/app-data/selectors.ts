import {NameSpace} from '../../const';
import {ProductDto} from '../../types/product.dto';
import {State} from '../../types/state';

export const getProducts = (state: State): ProductDto[] => state[NameSpace.Data].products;
export const getProduct = (state: State): ProductDto | null => state[NameSpace.Data].product;
