import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CartComponent } from './buy-product/cart/cart.component';
import { ViewMobileComponent } from './buy-product/view-mobile/view-mobile.component';
import { BuyNowComponent } from './buy-product/buy-now/buy-now.component';

const routes: Routes = [

  {
    path:"sell",
    component:SellProductComponent
  },
  {
    path:"buy",
    component:BuyProductComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"viewMobile",
    component:ViewMobileComponent
  },
  {
    path:"buyNow",
    component:BuyNowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
