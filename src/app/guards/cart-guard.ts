import { CartStateManager } from './../state.managers/cart.state.manager';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CartGuard implements CanActivate {

  constructor(private cartStateManager: CartStateManager) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.cartStateManager.stateInitialized) { return false; }
    // tslint:disable-next-line: no-non-null-assertion
    return this.cartStateManager.state!.length > 0;
  }
}
