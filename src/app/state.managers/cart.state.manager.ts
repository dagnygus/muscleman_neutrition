import { CartItemModel } from './../models/cart-item-model';
import { DeepReadonly, DnngStateManager } from '../base-state-manager/dnng.state.manager';
import { BindMethod } from '../decorators/bind-method';
import * as storageKeys from '../utils/storageKeys';
import { Subject } from 'rxjs';

export class CartStateManager extends DnngStateManager<CartItemModel[]> {

  private _cartItemChanged = new Subject<string>();
  cartItemChanged = this._cartItemChanged.asObservable();

  selectedProduct: CartItemModel | null = null;

  protected provideInitialState(): CartItemModel[] {

    const cartList = this.getCartListFromLocalStorage();

    return cartList;
  }

  @BindMethod addSelectedProductToCart(item: CartItemModel): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.writableState!.push(item);
    this.notifyChanges();
  }

  @BindMethod increaseQuantity(): void {
    if (this.selectedProduct) {
      if (this.selectedProduct.quantity === 99) { return; }
      this.selectedProduct.quantity++;
    }
  }

  @BindMethod decraseQuantity(): void {
    if (this.selectedProduct) {
      if (this.selectedProduct.quantity === 1) { return; }
      this.selectedProduct.quantity--;
    }
  }

  @BindMethod addToCart(newItem?: CartItemModel): void {
    if (!this.writableState) { return; }

    if (newItem) {
      const item = this.writableState.find(prod => prod.id === newItem.id);

      if (item) {
        item.quantity += newItem.quantity;
        this.setCartListInLocalStorage(this.writableState);
        this.notifyChanges();
      } else {
        this.writableState.push(newItem);
        this.setCartListInLocalStorage(this.writableState);
        this.notifyChanges();
      }
      return;
    }

    if (this.selectedProduct) {
      const item = this.writableState.find(prod => prod.id === this.selectedProduct?.id);

      if (item) {
        item.quantity += this.selectedProduct.quantity;
        this.setCartListInLocalStorage(this.writableState);
        this.notifyChanges();
      } else {
        this.writableState.push(this.selectedProduct);
        this.setCartListInLocalStorage(this.writableState);
        this.notifyChanges();
      }
    }
  }

  @BindMethod removeItemFromCart(productId: string): void {
    if (this.writableState) {
      const itemIndex = this.writableState.findIndex(prod => prod.id === productId);
      if (itemIndex < 0) { return; }
      this.writableState.splice(itemIndex, 1);
      this.setCartListInLocalStorage(this.writableState);
      this.notifyChanges();
    }
  }

  @BindMethod clearCart(): void {
    if (this.writableState) {
      if (this.writableState.length === 0) { return; }
      this.writableState.splice(0);
      this.setCartListInLocalStorage(this.writableState);
      this.notifyChanges();
    }
  }

  @BindMethod increaseQuantityOfItem(id: string): void {
    if (this.writableState) {
      const itemIndex = this.writableState.findIndex(prod => prod.id === id);
      if (itemIndex > -1) {
        if (this.writableState[itemIndex].quantity === 99) { return; }
        this.writableState[itemIndex].quantity++;
        this.setCartListInLocalStorage(this.writableState);
        this._cartItemChanged.next(id);
      }
    }
  }

  @BindMethod decreaseQuantityOfItem(id: string): void {
    if (this.writableState) {
      const itemIndex = this.writableState.findIndex(prod => prod.id === id);
      if (itemIndex > -1) {
        if (this.writableState[itemIndex].quantity === 1) { return; }
        this.writableState[itemIndex].quantity--;
        this.setCartListInLocalStorage(this.writableState);
        this._cartItemChanged.next(id);
      }
    }
  }


  private getCartListFromLocalStorage(): CartItemModel[] {
    let cartListJson = localStorage.getItem(storageKeys.cartKey);
    let cartList: CartItemModel[];
    if (!(localStorage.getItem(storageKeys.cartKey))) {
      cartListJson = JSON.stringify([]);
      localStorage.setItem(storageKeys.cartKey, cartListJson);
    }
    // tslint:disable-next-line: no-non-null-assertion
    cartList = JSON.parse(cartListJson!);
    return cartList;
  }

  private setCartListInLocalStorage(cartList: CartItemModel[] | DeepReadonly<CartItemModel[]>): void {
    localStorage.setItem(storageKeys.cartKey, JSON.stringify(cartList));
  }
}
