import { CartStateManager } from './../../state.managers/cart.state.manager';
import { HomeStateManager } from '../../state.managers/home.state.manager';
import { Component, OnInit, ChangeDetectorRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: HomeComponent }]
})
export class HomeComponent extends DnngComponentBase implements OnInit {
  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public homeStateManager: HomeStateManager,
              public cartStateManager: CartStateManager,
              private _router: Router) {
    super(cd, ngz);
  }
  ngOnInit(): void {
    this.cartStateManager.init();
    this.homeStateManager.init();
    this.homeStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
    });
  }
  cardClicked(id: string): void {
    this._router.navigate(['/single-product', id]);
  }
}
