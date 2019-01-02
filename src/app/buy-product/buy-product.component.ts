import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { CartComponent } from './cart/cart.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  constructor(private service : AppServiceService,private route : ActivatedRoute) { }

  

  ngOnInit() {
    this.getAll();
    this.getCartItem()

  }
  length:number=0;
  mobiles:[ ];
  mobile:{
    images:[]
  }
  out:boolean=false;
  few:boolean=false;
  mobileId:any
  getCartItem()
  {
    this.service.getCartItem().subscribe((data:[])=>{
      this.length=data.length;
      this.mobileId=data.map(function(cart){if(cart.incart){return cart.mobile_id}})
    });
  }
  
  getAll()
  {
    this.service.getAll().subscribe((data:[])=>{
      this.mobiles=data;
      console.log(this.mobiles);
      for(let j=0;j<this.mobiles.length;j++)
      {
        let imageArr=this.mobiles[j].images.split(",");
        var perfectImage=[];
        for(let i=0;i<imageArr.length;i++)
        {
          perfectImage[i]="data:image/png;base64,"+imageArr[i];
        }
        this.mobiles[j].images=perfectImage;
        if(this.mobiles[j].stock==0)
        {
          this.out=true;
        }
        if(this.mobiles[j].stock>=1 && this.mobiles[j].stock<10)
        {
          this.few=true;
          console.log(this.few)
        }
      }
      console.log(this.mobiles)
    });
  }

  OutOf(stock)
  {
      if(stock==0)
      {
        return true;
      }
      else{
        return false;
      }
  }

  fewLeft(stock)
  {
    if(stock>=1 && stock<10)
    {
      return true;
    }
    else
    {
      return false;
    }

  }

  viewIndividual(id)
  {
    // this.service.viewIndividual(id).subscribe((data:{})=>{
    //   console.log(data);
    // })
    console.log(id)
    window.location.href="/viewMobile?&id="+id;
  }
  addToCart(id)
  {
    this.service.addToCart(id).subscribe((data:any)=>{
      console.log(data)
        window.location.href="/buy";
    })
  }

}
