import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DnngComponentBase } from '../base-component/dnng.component.base';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[dnngListenTo]',
})
export class ListenToDirective implements OnInit, OnDestroy {

  @Input() dnngListenTo: Observable<any> | Observable<any>[] | null = null;
  // tslint:disable-next-line: variable-name
  private _subscriptionList: Subscription[] = [];

  // tslint:disable-next-line: variable-name
  constructor(private _component: DnngComponentBase) { }

  ngOnInit(): void {

    if (this.dnngListenTo == null) {
      return;
    }

    if (this.dnngListenTo instanceof Observable) {
      this._subscriptionList.push(this.dnngListenTo.subscribe(() => {
        (this._component as any)._detectChangesLocaly();
      }));
      return;
    }

    if (this.dnngListenTo instanceof Array) {
      for (const obs of this.dnngListenTo) {
        this._subscriptionList.push(obs.subscribe(() => {
          (this._component as any)._detectChangesLocaly();
        }));
      }
    }
  }

  ngOnDestroy(): void {
    for (const subsc of this._subscriptionList) {
      subsc.unsubscribe();
    }
  }

}
