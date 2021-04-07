import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DnngStateManager } from '../base-state-manager/dnng.state.manager';
import { BindMethod } from '../decorators/bind-method';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchBoxStateManager extends DnngStateManager<{ id: string, name: string }[]> {

  searchKey = '';
  private _url = 'assets/products-data/individual-products/prod_list.json';
  private _subscription: Subscription | null = null;
  constructor(private _http: HttpClient) { super(); }

  protected provideInitialState(): { id: string, name: string }[] {
    return [];
  }

  @BindMethod fetchFirstTen(): void {
    this._subscription?.unsubscribe();
    if (this.searchKey !== '') {
      this._subscription = this._http.get<{ id: string, name: string }[]>(this._url)
      .subscribe((data) => {
        const filterdData = data.filter(item => item.name.toLowerCase().includes(this.searchKey.toLowerCase()));
        filterdData.sort((prev, curr) => {
          if (prev.name < curr.name) { return -1; }
          if (prev.name > curr.name) { return +1; }
          return 0;
        });
        if (filterdData.length > 10) {
          filterdData.splice(10);
        }
        this.writableState = filterdData;
        this.notifyChanges();
        this._subscription?.unsubscribe();
      });
    } else {
      this.writableState = [];
      this.notifyChanges();
    }
  }

  clear(): void {
    this.writableState?.splice(0);
    this.notifyChanges();
  }

}
