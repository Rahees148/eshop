import { ProductModel } from './product-model';

export interface CartModal{
    count: number;
    productData:ProductModel[];
}