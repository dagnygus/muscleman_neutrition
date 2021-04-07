import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[dnngRouteComponent]'
})
export class DnngRouteComponentDirective implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  _subscription!: Subscription;


  // tslint:disable-next-line: variable-name
  constructor(private _component: DnngComponentBase, private _router: Router) { }

  ngOnInit(): void {
    this._subscription = this._router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this._component.markForCheckLocaly();
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
