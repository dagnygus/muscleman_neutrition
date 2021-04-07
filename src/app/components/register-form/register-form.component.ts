import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthStateManager } from '../../state.managers/auth.state.manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: RegisterFormComponent }]
})
export class RegisterFormComponent extends DnngComponentBase implements OnInit {

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public authStateManager: AuthStateManager,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: object) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.authStateManager.initialize();
    this.authStateManager.onChanged.listen(this, () => {
      if (this.authStateManager.isLogged) {
        this.router.navigate(['']);
      }
    });
  }

  onSubmitButtonClicked(form: NgForm): void {
    for (const controlName in form.controls) {
      if (controlName) {
        const control = form.controls[controlName];
        control.markAsDirty();
        control.markAllAsTouched();
      }
    }
  }
}
