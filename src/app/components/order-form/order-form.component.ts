import { CartStateManager } from './../../state.managers/cart.state.manager';
import { Router } from '@angular/router';
import { OrderStateManager } from '../../state.managers/order.state.manager';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: OrderFormComponent }]
})
export class OrderFormComponent extends DnngComponentBase implements OnInit {
  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              public orderStateManager: OrderStateManager,
              private router: Router) {
    super(cd, ngz);
  }
  ngOnInit(): void {
    this.orderStateManager.initialize();
  }

  onSubmitButtonClicked(form: NgForm): void {
    for (const controlName in form.controls) {
      if (controlName) {
        form.controls[controlName].markAsDirty();
        form.controls[controlName].markAsTouched();
      }
    }
  }

  onSubmitForm(): void {
    this.router.navigate(['/order-success']);
  }
}
