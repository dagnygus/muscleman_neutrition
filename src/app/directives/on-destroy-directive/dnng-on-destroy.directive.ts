import { Directive, EventEmitter, Output, OnDestroy } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[dnngOnDestroy]'
})
export class DnngOnDestroyDirective implements OnDestroy {

  // tslint:disable-next-line: variable-name
  private _dnngOnDestroy = new EventEmitter<void>();
  @Output() dnngOnDestroy = this._dnngOnDestroy.asObservable();

  ngOnDestroy(): void {
    this._dnngOnDestroy.next();
  }

}
