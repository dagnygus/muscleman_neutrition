import { CartItemModel } from './../models/cart-item-model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartItemPrice'
})
export class CartItemPricePipe implements PipeTransform {

  transform(value: string, quantity: number): string {
    const priceAsNumber = +(value.replace('$', ''));
    const totalPrice = quantity * priceAsNumber;
    return totalPrice.toString() + '$';
  }

}
