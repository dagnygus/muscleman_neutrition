import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartItemModel } from '../../../models/cart-item-model';
import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DnngComponentBase } from '../../../base-component/dnng.component.base';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CartItemComponent }]
})
export class CartItemComponent extends DnngComponentBase implements OnInit {

  @Input() cartItem: CartItemModel | null = null;
  @Input() cartItemChanged: Observable<string> | null = null;

  private _onIncreaseClick = new EventEmitter<void>();
  private _onDecreaseClick = new EventEmitter<void>();
  private _onDeleteClick = new EventEmitter<void>();

  @Output() get onIncreaseClick(): Observable<void> {
    return this._onIncreaseClick;
  }
  @Output() get onDecreaseClick(): Observable<void> {
    return this._onDecreaseClick;
  }
  @Output() get onDeleteClick(): Observable<void> {
    return this._onDeleteClick;
  }

  ngOnInit(): void {
    if (!this.cartItemChanged) { return; }
    this.cartItemChanged
      .pipe(filter((productId) => productId === this.cartItem?.id))
      .listen(this, () => {
        if (!this.cartItem) { return; }
        this.markForCheckLocaly();
      });
  }

  deleteClick(): void {
    this._onDeleteClick.emit();
  }
}
