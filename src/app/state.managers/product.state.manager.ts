import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ProductModel } from './../models/product-model';
import { DnngStateManager } from '../base-state-manager/dnng.state.manager';
import { Injectable } from '@angular/core';

@Injectable()
export class SingleProductStateManager extends DnngStateManager<ProductModel> {

  private _baseUrl = 'assets/products-data/individual-products/';

  private _productId: string | null = null;
  set productId(value: string | null) {
    this._productId = value ? value + '.json' : null;
  }

  constructor(private _http: HttpClient) {
    super();
  }

  provideInitialState(): Observable<ProductModel> | null {
    if (this._productId) {
      return this._http.get<ProductModel>(this._baseUrl + this._productId)
        .pipe(first());
    }
    return null;
  }
}
