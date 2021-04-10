import { skip } from 'rxjs/operators';
import { CartStateManager } from '../../state.managers/cart.state.manager';
import { ActivatedRoute } from '@angular/router';
import { SingleProductStateManager } from '../../state.managers/product.state.manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ProductComponent }]
})
export class ProductComponent extends DnngComponentBase implements OnInit {

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public singleProductStateManager: SingleProductStateManager,
              public cartStateManager: CartStateManager,
              private _activatedRoute: ActivatedRoute) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.singleProductStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
      if (this.singleProductStateManager.stateInitialized && this.singleProductStateManager.state) {
        this.cartStateManager.selectedProduct = {
          id: this.singleProductStateManager.state.id,
          name: this.singleProductStateManager.state.name,
          imageUrl: this.singleProductStateManager.state.imageUrl,
          price: this.singleProductStateManager.state.price,
          quantity: 1
        };
      }
    });
    this._activatedRoute.paramMap.listen(this, paramMap => {
      this.singleProductStateManager.productId = paramMap.get('id');
      this.singleProductStateManager.load();
    });
    this.cartStateManager.init();
  }

}
