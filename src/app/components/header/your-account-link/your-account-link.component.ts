import { AuthStateManager } from '../../../state.managers/auth.state.manager';
import { Component, HostListener, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { DnngComponentBase } from '../../../base-component/dnng.component.base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-your-account-link',
  templateUrl: './your-account-link.component.html',
  styleUrls: ['./your-account-link.component.scss']
})
export class YourAccountLinkComponent extends DnngComponentBase implements OnInit {
  dropdownOpen = false;


  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public authStateManager: AuthStateManager) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.authStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
    });
    this.authStateManager.initialize();
  }

  @HostListener('body:click', ['$event.target'])
  onBodyClicked(element: HTMLElement): void {
    if (!element.closest('app-your-account-link') && this.dropdownOpen) {
      this.dropdownOpen = false;
      this.markForCheckLocaly();
    }
  }
}
