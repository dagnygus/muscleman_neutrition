import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ChangeDetectorRef, NgZone, EventEmitter, Output } from '@angular/core';
import { DnngComponentBase } from '../base-component/dnng.component.base';

@Component({
  selector: 'app-sidedrawer',
  templateUrl: './sidedrawer.component.html',
  styleUrls: ['./sidedrawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: SidedrawerComponent }]
})
export class SidedrawerComponent extends DnngComponentBase {

  // tslint:disable-next-line: variable-name
  private _open = false;
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this._openChange.emit(value);
      switch (value) {
        case true:
          this.renderer.addClass(this.elRef.nativeElement, 'open');
          break;
        default:
          this.renderer.removeClass(this.elRef.nativeElement, 'open');
          break;
      }
    }
  }

  // tslint:disable-next-line: variable-name
  private _openChange = new EventEmitter<boolean>();
  @Output() openChange = this._openChange.asObservable();

  constructor(private elRef: ElementRef<HTMLElement>,
              private renderer: Renderer2,
              cd: ChangeDetectorRef,
              ngz: NgZone) { super(cd, ngz); }

}
