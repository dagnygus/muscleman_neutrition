import { AuthStateManager } from './../state.managers/auth.state.manager';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  subscription: Subscription | null = null;

  constructor(private authStateManager: AuthStateManager,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    this.authStateManager.onChanged
      .pipe(filter(() => this.router.isActive(state.url, false)))
      .subscribe(() => {
        if (!this.authStateManager.isLogged) {
          this.router.navigate(['/loggin']);
        }
      });

    console.log('sadassasasa');

    if (this.authStateManager.isLogged) {
      return true;
    } else {
      const urlTree = this.router.parseUrl('/loggin');
      return urlTree;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
