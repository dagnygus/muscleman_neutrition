import { CartStateManager } from './../../state.managers/cart.state.manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, NgZone, Output, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: HeaderComponent }]
})
export class HeaderComponent extends DnngComponentBase implements OnInit {

  // tslint:disable-next-line: variable-name
  private _categoryButtonClick = new EventEmitter<void>();
  @Output() categoryButtonClick = this._categoryButtonClick.asObservable();

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public cartStateManager: CartStateManager) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.cartStateManager.onChanged.listen(this, () => {
      this.markForCheckLocaly();
    });
    this.cartStateManager.init();
  }

}
