import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[dnFor]'
})
export class DnForDirective {

  private _from = 0;
  private _to = 0;

  @Input() set dnForIn(object: any) {
    this._viewContainerRef.clear();
    for (const prop in object) {
      if (prop) {
        this._viewContainerRef.createEmbeddedView(this._templateRef, {
          $implicit: object[prop]
        });
      }
    }
  }

  @Input() set dnForFrom(value: number) {
    if (this._from === value) { return; }
    this._from = value;
  }

  @Input() set dnForTo(value: number) {
    if (this._to === value) { return; }
    this._to = value;
    if (this._from >= this._to) { return; }
    this._viewContainerRef.clear();
    for (let index = this._from; index <= this._to; index++) {
      this._viewContainerRef.createEmbeddedView(this._templateRef, {
        $implicit: index
      });
    }
  }
  // tslint:disable-next-line: variable-name
  constructor(private _templateRef: TemplateRef<any>, private _viewContainerRef: ViewContainerRef) { }

}
