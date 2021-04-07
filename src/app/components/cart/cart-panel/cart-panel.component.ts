import { Observable } from 'rxjs';
import { DeepReadonly } from '../../../base-state-manager/dnng.state.manager';
import { CartItemModel } from '../../../models/cart-item-model';
import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DnngComponentBase } from '../../../base-component/dnng.component.base';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CartPanelComponent }]
})
export class CartPanelComponent extends DnngComponentBase implements OnInit {

  private _onClearCartClick = new EventEmitter<void>();
  private _onMakeOrderClick = new EventEmitter<void>();

  @Output() get onClearCartClick(): Observable<void> {
    return this._onClearCartClick;
  }
  @Output() get onMakeOrderClick(): Observable<void> {
    return this._onMakeOrderClick;
  }

  @Input() cartItems: DeepReadonly<CartItemModel[]> | null = null;
  @Input() cartItemChanged: Observable<string> | null = null;

  get totalPrice(): string {
    if (!this.cartItems) { return '0$'; }
    let price = 0;
    this.cartItems.forEach((item) => {
      const istPrice = +(item.price.replace('$', '')) * item.quantity;
      price += istPrice;
    });

    return price + '$';
  }

  ngOnInit(): void {
    if (this.cartItemChanged) {
      this.cartItemChanged.listen(this, () => {
        this.markForCheckLocaly();
      });
    }
  }
}
