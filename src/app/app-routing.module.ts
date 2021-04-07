import { CartGuard } from './guards/cart-guard';
import { UnAuthGuard } from './guards/un-auth-guard';
import { AuthGuard } from './guards/auth-guard';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { LogginFormComponent } from './components/loggin-form/loggin-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { DeliveryCostComponent } from './components/delivery-cost/delivery-cost.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { WholesaleComponent } from './components/wholesale/wholesale.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'products/:category', component: ProductsComponent},
  { path: 'wholesale', component: WholesaleComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'delivery-cost', component: DeliveryCostComponent },
  { path: 'regulations', component: RegulationsComponent },
  { path: 'registration', component: RegisterFormComponent, canActivate: [UnAuthGuard] },
  { path: 'loggin', component: LogginFormComponent, canActivate: [UnAuthGuard] },
  { path: 'single-product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'make-order', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard, CartGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
