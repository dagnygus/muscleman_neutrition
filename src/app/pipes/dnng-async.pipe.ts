import { Pipe, PipeTransform, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DnngComponentBase } from '../base-component/dnng.component.base';

@Pipe({
  name: 'dnngAsync',
  pure: false
})
export class DnngAsyncPipe implements PipeTransform, OnDestroy {

  private emitedValue: any;
  private initialized = false;
  private subscription: Subscription | null = null;

  constructor(private component: DnngComponentBase) { }

  transform(value: Observable<any>): any {

    if (!this.initialized) {
      this.subscription = value.subscribe((data) => {
        this.emitedValue = value;
        this.component.markForCheckLocaly();
      });
      this.initialized = true;
    }

    return this.emitedValue;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
