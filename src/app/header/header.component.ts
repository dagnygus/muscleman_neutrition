import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { DnngComponentBase } from '../base-component/dnng.component.base';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: HeaderComponent }]
})
export class HeaderComponent extends DnngComponentBase {

  // tslint:disable-next-line: variable-name
  private _categoryButtonClick = new EventEmitter<void>();
  @Output() categoryButtonClick = this._categoryButtonClick.asObservable();

  onCategoriesButtonClick(): void {
    this._categoryButtonClick.emit();
  }

}
