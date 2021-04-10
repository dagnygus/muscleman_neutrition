import { filter } from 'rxjs/operators';
import { AuthStateManager } from '../../state.managers/auth.state.manager';
import { NgForm } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-loggin-form',
  templateUrl: './loggin-form.component.html',
  styleUrls: ['./loggin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: LogginFormComponent }]
})
export class LogginFormComponent extends DnngComponentBase implements OnInit {

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public authStateManager: AuthStateManager,
              private router: Router,
              @Inject(PLATFORM_ID) platformId: object) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.authStateManager.init();
    this.authStateManager.onChanged.listen(this, () => {
      if (this.authStateManager.isLogged) {
        this.router.navigate(['']);
      }
    });

    const subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const mainHeader = document.getElementById('main_header') as HTMLElement;
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          window.scrollTo({
            top: mainHeader.offsetHeight,
            behavior: 'smooth'
          });
        }, 100);
      });
      subscription.unsubscribe();
    });
  }

  onSubmitButtonClicked(form: NgForm): void {
    for (const controlName in form.controls) {
      if (controlName) {
        form.controls[controlName].markAsDirty();
        form.controls[controlName].markAsTouched();
      }
    }
  }
}
