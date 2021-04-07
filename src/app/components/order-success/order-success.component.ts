import { OrderStateManager } from '../../state.managers/order.state.manager';
import { CartStateManager } from '../../state.managers/cart.state.manager';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: OrderSuccessComponent }]
})
export class OrderSuccessComponent extends DnngComponentBase implements OnInit {


  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public cartStateManager: CartStateManager,
              public orderStateManager: OrderStateManager) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.cartStateManager.initialize();
    this.orderStateManager.initialize();
    setTimeout(() => {
      this.cartStateManager.clearCart();
      this.orderStateManager.resetFields();
    });
  }
}
