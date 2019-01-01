import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service : AppServiceService) { }
  length:number;
  cartItem:any;
  cartMobiles:[];
  mobiles:[]
  cart:[];
  total:number=0;
  ngOnInit() {
    this.getCartLength();
    this.getCartMobile();
  }

  getCartLength()
  {
    this.service.getCartItem().subscribe((data:[])=>{
      this.length=data.length;
      this.cartItem=data;
      
    });
  }

  getCartMobile()
  {
    this.service.getCartMobile().subscribe((data:[])=>{
      this.mobiles=data;
      for(let j=0;j<this.mobiles.length;j++)
      {
        let imageArr=this.mobiles[j].images.split(",");
        var perfectImage=[];
        for(let i=0;i<imageArr.length;i++)
        {
          perfectImage[i]="data:image/png;base64,"+imageArr[i];
        }
        this.mobiles[j].images=perfectImage;
        this.mobiles[j].qty=1;
        this.total+=this.mobiles[j].price;
      }
    });
  }
  isZero:boolean;
  decCount(index)
  {
    if(this.mobiles[index].qty>=1)
    {
      if(this.mobiles[index].qty==1)
      {
        this.isZero=true;
      }
      else{
        this.isZero=false;
        this.mobiles[index].qty-=1;
        this.total-=this.mobiles[index].price
      }
    }
  }
  incCount(index)
  {
    this.isZero=false;
    this.mobiles[index].qty+=1;
    this.total += this.mobiles[index].price
  }
  removeItem(mobileId:number)
  {
    this.service.removeMobileFromCart(mobileId).subscribe((data:[])=>{
      window.location.href="/cart";
    })
  }

  continue()
  {
    window.location.href="/buy"
  }

  placeAnOrder()
  {
      window.location.href="/buyNow?cart="+1+"&id="+0;
  }

}
