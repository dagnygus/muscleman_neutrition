import { first, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, merge } from 'rxjs';
import { ProductModel } from './../models/product-model';
import { DnngStateManager } from '../base-state-manager/dnng.state.manager';
import { Injectable } from '@angular/core';
import { BindMethod } from '../decorators/bind-method';

@Injectable()
export class SingleProductStateManager extends DnngStateManager<ProductModel> {

  private _baseUrl = 'assets/products-data/individual-products/';
  private _subscription: Subscription | null = null;
  private _fetchingProduct = false;
  private _fetchingProduct$ = new BehaviorSubject<boolean>(false);

  get fetchingProduct(): boolean {
    return this._fetchingProduct;
  }
  get fetchingProduct$(): Observable<boolean> {
    return this._fetchingProduct$;
  }

  get statePending(): boolean {
    return super.statePending || this.fetchingProduct;
  }
  get statePending$(): Observable<boolean> {
    return merge(super.statePending$, this.fetchingProduct$);
  }

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

  @BindMethod fetchProduct(): void {
    if (!this.stateInitialized && this.statePending) {
      this.cancelProvidingState();
      this._subscription?.unsubscribe();
    }

    if (!this.stateInitialized && this.failedToInitialState) {
      this.tryLoadStateAgain();
      return;
    }

    if (this.stateInitialized && this.statePending) {
      this._subscription?.unsubscribe();
    }

    this._fetchingProduct = true;
    this._fetchingProduct$.next(true);

    this._subscription = this._http.get<ProductModel>(this._baseUrl + this._productId)
      .listen(this, (product) => {
        this.writableState = product;
        this._fetchingProduct = false;
        this._fetchingProduct$.next(false);
        this._subscription?.unsubscribe();
        this.notifyChanges();
      });
  }
}
