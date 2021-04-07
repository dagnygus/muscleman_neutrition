import { CartStateManager } from '../../state.managers/cart.state.manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CartComponent }]
})
export class CartComponent extends DnngComponentBase implements OnInit {
  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public cartStateManager: CartStateManager) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.cartStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
    });
    this.cartStateManager.initialize();
  }
}
