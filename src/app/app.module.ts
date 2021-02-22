import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidedrawerComponent } from './sidedrawer/sidedrawer.component';
import { ListenToDirective } from './listen-to-directive/listen-to.directive';
import { HomeComponent } from './home/home.component';
import { DnngRouteComponentDirective } from './route-component-directive/dnng-route-component.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidedrawerComponent,
    ListenToDirective,
    HomeComponent,
    DnngRouteComponentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
