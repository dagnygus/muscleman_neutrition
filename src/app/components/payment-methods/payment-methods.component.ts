import { DnngComponentBase } from 'src/app/base-component/dnng.component.base';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: PaymentMethodsComponent }]
})
export class PaymentMethodsComponent extends DnngComponentBase {

}
