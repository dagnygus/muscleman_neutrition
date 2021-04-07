import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ProductModalComponent }]
})
export class ProductModalComponent extends DnngComponentBase implements OnInit {

  private _open = false;
  set open(value: boolean) {
    if (this._open === value) { return; }
    if (value) {
      this._renderer.addClass(this._elementRef.nativeElement, 'open');
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, 'open');
    }
    this._open = value;
  }
  get open(): boolean {
    return this._open;
  }

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private _elementRef: ElementRef<HTMLElement>,
              private _renderer: Renderer2) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this._renderer.listen(this._elementRef.nativeElement, 'click', (event: MouseEvent) => {
      if (event.target === this._elementRef.nativeElement) {
        this.open = false;
      }
    });
  }
}
