import { ProductItemModel } from './product-item-model';
export interface ProductModel extends ProductItemModel {
  description: string;
  ingredients: string[];
}
