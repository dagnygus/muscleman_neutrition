import { ProductItemModel } from './product-item-model';

export interface HomeProductsModel {
  newest: ProductItemModel[];
  recomended: ProductItemModel[];
  mostPopular: ProductItemModel[];
}
