import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-view-mobile',
  templateUrl: './view-mobile.component.html',
  styleUrls: ['./view-mobile.component.css']
})
export class ViewMobileComponent implements OnInit {

  constructor(private route : ActivatedRoute,private service : AppServiceService) { }
  length:number=0
  viwedImage:any;
  viewId:any;
  mobile:any;
  cartMobile:any;
  ngOnInit() {
    this.route.queryParams.subscribe(param=>{
        this.getMobile(param['id'])
    })
    this.getCartLength();
  }
  getMobile(mobile_id)
  {
      this.service.viewIndividual(mobile_id).subscribe(data=>{
        this.mobile=data[0]
        let imageArr=this.mobile.images.split(",");
        var perfectImage=[];
        for(let i=0;i<imageArr.length;i++)
        {
          perfectImage[i]="data:image/jpeg;base64,"+imageArr[i];
        }
        console.log(perfectImage)
        this.mobile.images=perfectImage;
        this.viwedImage=this.mobile.images[0]
      })
  }
  viewSpecificImage(image){
      this.viwedImage=image;
  }

  getCartLength()
  {
    this.service.getCartItem().subscribe((data:[])=>{
      this.length=data.length;
      let cartMobile=data.map(function(cart){return cart.mobile_id});
      this.cartMobile=cartMobile;

    })
  }
  addToCart(id)
  {
    this.service.addToCart(id).subscribe((data:any)=>{
      console.log(data)
        window.location.href="/buy";
    })
  }

  goTo()
  {
    window.location.href="/cart";
  }

  buyNow()
  {
    window.location.href="/buyNow?&id="+this.mobile.mobile_id+"&cart="+0;
  }

}
