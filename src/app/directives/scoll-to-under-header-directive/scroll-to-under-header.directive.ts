import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Directive, Inject, PLATFORM_ID, ElementRef, HostListener, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { Route, Router, NavigationEnd, NavigationStart } from '@angular/router';

@Directive({
  selector: '[appScrollToUnderHeader]'
})
export class ScrollToUnderHeaderDirective implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;
  private subscription2: Subscription | null = null;
  private isClicked = false;
  private isDestroyed = false;
  private isNavigating = false;

  @Input() appAllawScrolling: boolean | null = true;
  @Input() appScrollDelay = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe(() => {
        this.isNavigating = true;
      });


      this.subscription2 = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd && this.isClicked)
      ).subscribe(() => {
        this.isClicked = false;
        this.isNavigating = false;
        if (this.appAllawScrolling) {
          const mainHeader = document.getElementById('main_header') as HTMLElement;
          if (this.appScrollDelay) {
            this.ngZone.runOutsideAngular(() => {
              setTimeout(() => {
                window.scrollTo({
                  top: mainHeader.offsetHeight,
                  behavior: 'smooth'
                });
              }, this.appScrollDelay);
            });
          } else {
            window.scrollTo({
              top: mainHeader.offsetHeight,
              behavior: 'smooth'
            });
          }
        }
        if (this.isDestroyed) {
          this.subscription?.unsubscribe();
          this.subscription2?.unsubscribe();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (!this.isNavigating) {
      this.subscription?.unsubscribe();
      this.subscription2?.unsubscribe();
    }
  }

  @HostListener('click')
  ElementClicked(): void {
    this.isClicked = true;
  }

}
