import { Component, OnInit, ViewChild } from '@angular/core';
import { AddMobileComponent } from './add-mobile/add-mobile.component';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {

  constructor(private service: AppServiceService) { }

  @ViewChild(AddMobileComponent) child: AddMobileComponent

  ngOnInit() {
    this.getAllMobile();
  }
  mobiles: [];
  showVar: boolean;
  addMobile() {
    // this.showVar = true;
    this.child.openMobile();
  }
  imgSrc: [];
  singleImg: Array<String>=[];
  getAllMobile() {
    this.service.getAll().subscribe((data: []) => {
      this.mobiles = data;
      this.getImage(this.mobiles);
    });
  }
  getImage(mobileImgae: any) {
    this.imgSrc = mobileImgae[0].images.split(",")
    for(let i=0;i<this.imgSrc.length;i++)
    {
      this.singleImg[i]="data:image/png;base64,"+this.imgSrc[i];
    }
  }

  editMobileData(index) {
    console.log(this.mobiles[index])
    this.child.viewEditableData(this.mobiles[index])
  }

  deleteMobile(id) {
    this.service.deleteMobile(id)
    window.location.href="/sell"
  }

}
