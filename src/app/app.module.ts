import { CartGuard } from './guards/cart-guard';
import { UnAuthGuard } from './guards/un-auth-guard';
import { AuthGuard } from './guards/auth-guard';
import { OrderStateManager } from './state.managers/order.state.manager';
import { CartStateManager } from './state.managers/cart.state.manager';
import { SingleProductStateManager } from './state.managers/product.state.manager';
import { AuthStateManager } from './state.managers/auth.state.manager';
import './rxjs-extension/rxjs-extension';

import { ProductsStateManager } from './state.managers/products.state.manager';
import { HomeStateManager } from './state.managers/home.state.manager';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidedrawerComponent } from './components/sidedrawer/sidedrawer.component';
import { ListenToDirective } from './directives/listen-to-directive/listen-to.directive';
import { HomeComponent } from './components/home/home.component';
import { DnngRouteComponentDirective } from './directives/route-component-directive/dnng-route-component.directive';
import { CardComponent } from './components/card/card.component';
import { CardPaceholderComponent } from './components/card/card-paceholder/card-paceholder.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { WholesaleComponent } from './components/wholesale/wholesale.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { DeliveryCostComponent } from './components/delivery-cost/delivery-cost.component';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { ScrollToUnderHeaderDirective } from './directives/scoll-to-under-header-directive/scroll-to-under-header.directive';
import { YourAccountLinkComponent } from './components/header/your-account-link/your-account-link.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { DnForDirective } from './directives/dn-for-directive/dn-for.directive';
import { LogginFormComponent } from './components/loggin-form/loggin-form.component';
import { DnngAsyncPipe } from './pipes/dnng-async.pipe';
import { DnngOnDestroyDirective } from './directives/on-destroy-directive/dnng-on-destroy.directive';
import { ProductComponent } from './components/product/product.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { CartItemPricePipe } from './pipes/cart-item-price.pipe';
import { CartModalComponent } from './components/cart/cart-modal/cart-modal.component';
import { CartPanelComponent } from './components/cart/cart-panel/cart-panel.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AddToCartModalComponent } from './components/add-to-cart-modal/add-to-cart-modal.component';
import { SearchBoxComponent } from './components/header/search-box/search-box.component';
import { SearchBoxStateManager } from './state.managers/search.box.state.manager';

export const options: Partial<IConfig> = {
  validation: false
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidedrawerComponent,
    ListenToDirective,
    HomeComponent,
    DnngRouteComponentDirective,
    CardComponent,
    CardPaceholderComponent,
    ProductsComponent,
    FooterComponent,
    WholesaleComponent,
    PaymentMethodsComponent,
    DeliveryCostComponent,
    RegulationsComponent,
    ScrollToUnderHeaderDirective,
    YourAccountLinkComponent,
    RegisterFormComponent,
    DnForDirective,
    LogginFormComponent,
    DnngAsyncPipe,
    DnngOnDestroyDirective,
    ProductComponent,
    ProductModalComponent,
    CartComponent,
    CartItemComponent,
    CartItemPricePipe,
    CartModalComponent,
    CartPanelComponent,
    OrderFormComponent,
    OrderSuccessComponent,
    AddToCartModalComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RxReactiveFormsModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    HomeStateManager,
    ProductsStateManager,
    AuthStateManager,
    SingleProductStateManager,
    CartStateManager,
    OrderStateManager,
    AuthGuard,
    UnAuthGuard,
    CartGuard,
    SearchBoxStateManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
