import { Observable } from 'rxjs';
import {
          ChangeDetectionStrategy,
          Component,
          EventEmitter,
          Output,
          ChangeDetectorRef,
          NgZone,
          ElementRef,
          Renderer2,
          HostListener
        } from '@angular/core';
import { DnngComponentBase } from '../../../base-component/dnng.component.base';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CartModalComponent }]
})
export class CartModalComponent extends DnngComponentBase {
  private _onDeleteClick = new EventEmitter<string>();
  private _onClearCartClick = new EventEmitter<void>();

  private _open = false;
  get open(): boolean { return this._open; }
  set open(value: boolean) {
    if (this._open === value) { return; }
    if (value) {
      this._renderer.addClass(this._elementRef.nativeElement, 'open');
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, 'open');
      this.productId = null;
      this.productName = null;
      this.clearCartMode = false;
    }
    this._open = value;
  }

  clearCartMode = false;
  productId: string | null = null;
  productName: string | null = null;
  @Output() get onDeleteClick(): Observable<string> {
    return this._onDeleteClick;
  }
  @Output() get onClearCartClick(): Observable<void> {
    return this._onClearCartClick;
  }

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private _elementRef: ElementRef<HTMLElement>,
              private _renderer: Renderer2) {
    super(cd, ngz);
  }

  @HostListener('click', ['$event.target'])
  private onModalClick(target: HTMLElement): void {
    if (target === this._elementRef.nativeElement) {
      this.open = false;
    }
  }
}
