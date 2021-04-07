import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: WholesaleComponent }]
})
export class WholesaleComponent extends DnngComponentBase {

}
