import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DnngComponentBase } from 'src/app/base-component/dnng.component.base';

@Component({
  selector: 'app-card-paceholder',
  templateUrl: './card-paceholder.component.html',
  styleUrls: ['./card-paceholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CardPaceholderComponent }]
})
export class CardPaceholderComponent extends DnngComponentBase {

}
