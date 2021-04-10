import { skip } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsStateManager } from '../../state.managers/products.state.manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';
import routeMap from '../../utils/route-map';
import { CartStateManager } from 'src/app/state.managers/cart.state.manager';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: ProductsComponent }]
})
export class ProductsComponent extends DnngComponentBase implements OnInit {

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public productsStateManager: ProductsStateManager,
              public cartStateManager: CartStateManager,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.pipe().listen(this, paramMap => {
      this.productsStateManager.url = routeMap.get(paramMap.get('category'));
      this.productsStateManager.load();
    });
    this.productsStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
    });
  }

  navigateToSelectedProduct(id: string): void {
    this._router.navigate(['/single-product', id]);
  }
}
