import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: RegulationsComponent }]
})
export class RegulationsComponent extends DnngComponentBase {

}
