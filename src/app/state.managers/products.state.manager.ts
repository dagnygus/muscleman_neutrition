import { delay, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductItemModel } from '../models/product-item-model';
import { DnngStateManager } from '../base-state-manager/dnng.state.manager';
import { BehaviorSubject, Observable, Subscription, merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { BindMethod } from '../decorators/bind-method';

@Injectable()
export class ProductsStateManager extends DnngStateManager<ProductItemModel[]> {

  private _url?: string;
  private _fetchingData = false;
  private _fetchingData$ = new BehaviorSubject<boolean>(false);
  private _subscription: Subscription | null = null;

  get fetchingData$(): Observable<boolean> {
    return this._fetchingData$.asObservable();
  }

  set url(value: string | undefined ) {
    if (value !== this._url) {
      this._url = value;
      this.canExecutefetchData = !!value;
    }
  }

  get statePending(): boolean {
    return super.statePending || this._fetchingData;
  }
  get statePending$(): Observable<boolean> {
    return merge(super.statePending$, this.fetchingData$);
  }

  canExecutefetchData: boolean | null = null;

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {
    super();
  }

  trackFn(index: number, item: ProductItemModel): string {
    return item.id;
  }

  protected provideInitialState(): Observable<ProductItemModel[]> | null  {
    if (this._url) {
      return this._http.get<ProductItemModel[]>(this._url).pipe(delay(2000), first());
    }
    return null;
  }

  @BindMethod fetchData(): void {
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

    this._fetchingData = true;
    this._fetchingData$.next(this._fetchingData);
    this.notifyChanges();
    // tslint:disable-next-line: no-non-null-assertion
    this._subscription = this._http.get<ProductItemModel[]>(this._url!).pipe(delay(2000)).listen(this, {
      next: (products) => {
        this.writableState = products;
        this._fetchingData = false;
        this._fetchingData$.next(this._fetchingData);
        this._subscription?.unsubscribe();
        this.notifyChanges();
      }
    });
  }
}
