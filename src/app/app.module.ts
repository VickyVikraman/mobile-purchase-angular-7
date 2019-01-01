import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { MapperComponent } from './mapper/mapper.component';
import { HttpClientModule } from '@angular/common/http';
import { AddMobileComponent } from './sell-product/add-mobile/add-mobile.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './buy-product/cart/cart.component';
import { ViewMobileComponent } from './buy-product/view-mobile/view-mobile.component';
import { BuyNowComponent } from './buy-product/buy-now/buy-now.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BuyProductComponent,
    SellProductComponent,
    MapperComponent,
    AddMobileComponent,
    CartComponent,
    ViewMobileComponent,
    BuyNowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
