import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductItemModel } from '../models/product-item-model';
import { DnngStateManager } from '../base-state-manager/dnng.state.manager';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsStateManager extends DnngStateManager<ProductItemModel[]> {

  url: string | null = null;

  constructor(private _http: HttpClient) {
    super();
  }

  trackFn(index: number, item: ProductItemModel): string {
    return item.id;
  }

  protected provideInitialState(): Observable<ProductItemModel[]> | null  {
    if (this.url) {
      return this._http.get<ProductItemModel[]>(this.url).pipe(first());
    }
    return null;
  }
}
