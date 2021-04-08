import { ProductItemModel } from '../models/product-item-model';
import { HomeProductsModel } from '../models/home-products-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { DnngStateManager } from '../base-state-manager/dnng.state.manager';
import { map } from 'rxjs/operators';

export interface HomeStateItem {
  id: string;
  name: string;
  rating: number;
  price: string;
  imageUrl: string;
}

@Injectable()
export class HomeStateManager extends DnngStateManager<HomeProductsModel> {

  constructor(private _http: HttpClient) {
    super();
  }

  protected provideInitialState(): Observable<HomeProductsModel> | null {
    const source1$ = this._http.get<ProductItemModel[]>('assets/products-data/newest.json');
    const source2$ = this._http.get<ProductItemModel[]>('assets/products-data/most_popular.json');
    const source3$ = this._http.get<ProductItemModel[]>('assets/products-data/recomended.json');

    const mainSource$ = zip(source1$, source2$, source3$).pipe(
      map(([newest, mostPopular, recomended]) => ({ newest, mostPopular, recomended }) )
    );

    return mainSource$;
  }

}
