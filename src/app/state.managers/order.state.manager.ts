import { DnngStateManager } from '../base-state-manager/dnng.state.manager';

export class OrderStateManager extends DnngStateManager<{}> {

  country = '';
  city = '';
  street = '';
  zipCode = '';
  courier = 'dpd';
  paymentMethod = 'cash_on_delivery';

  protected provideInitialState(): {} {
    return {};
  }

  resetFields(): void {
    this.country = '';
    this.city = '';
    this.street = '';
    this.zipCode = '';
    this.courier = 'dpd';
    this.paymentMethod = 'cash_on_delivery';
  }
}
