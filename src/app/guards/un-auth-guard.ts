import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthStateManager } from '../state.managers/auth.state.manager';

@Injectable()
export class UnAuthGuard implements CanActivate {

  constructor(private authSateManager: AuthStateManager) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.authSateManager.isLogged;
  }
}
