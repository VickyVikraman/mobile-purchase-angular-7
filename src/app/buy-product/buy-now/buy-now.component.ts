import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/app-service.service';
import {NgbModal, ModalDismissReasons,NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  constructor(private route : ActivatedRoute,private service : AppServiceService,private modalService : NgbModal) { }
  
  ngOnInit() {
    this.route.queryParams.subscribe(param=>{
      if(param['cart']==0)
      {
        this.getMobile(param['id'])
      }
      else{
          this.getAllMobile();
      }
  })
  }
  selectedCountry = 0;
  selectedState = 0;
  selectedCity=0;
  title = 'app';
  states = [];
  cities = [];
  address:any={};
  mobile:any;
  qty:number=1;
  isZero:boolean;
  total:number=0;
  addressView:boolean=false;
  orderView:boolean=false;
  paymentView:boolean=false;
  viewMail:boolean=true;
  mailView:boolean=false;
  addressEntered:boolean=false;
  mailEntered:boolean=false;
  addressChange:boolean=false;
  changeOrder:boolean=false;
  mailId:any;
  proceed:boolean=false;
  orderCorrect:boolean=false;
  mobiles=[];
  invoice:boolean=false;
  paymentSucc:boolean=false;
  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    this.address.selectedCountry=country_id;
    this.selectedState = 0;
    this.cities = [];
    this.states = this.getStates().filter((item) => {
      return item.country_id === Number(country_id)
    });
  }
 
  onSelectState(state_id: number) {
    this.address.selectedState=state_id;
    this.selectedState = state_id;
    this.cities = this.getCity().filter((item) => {
      return item.state_id === Number(state_id)
    });
  }
  onSelectCity(city : number)
  {
    this.address.selectedCity=city
    console.log(this.address)
    this.selectedCity=city;
  }
  getCountries() {
    return [
      { id: 1, name: 'India' },
      { id: 2, name: 'USA' },
      { id: 3, name: 'Australia' }
    ];
  }
  getStates() {
    return [
      { id: 1, country_id: 1, name: 'Andhra Pradesh' },
      { id: 2, country_id: 1, name: 'Madhya Pradesh' },
      { id: 3, country_id: 2, name: 'San Francisco' },
      { id: 4, country_id: 2, name: 'Los Angeles' },
      { id: 5, country_id: 3, name: 'New South Wales' },
      { id: 6, country_id: 3, name: 'Victoria' },
      { id: 7, country_id: 1, name: 'Tamilnadu' },
    ]
  }
 
  getCity() {
    return [
      { id: 1, state_id: 1, name: 'Guntur' },
      { id: 2, state_id: 1, name: 'Vijayawada' },
      { id: 3, state_id: 1, name: 'Nellore' },
      { id: 4, state_id: 1, name: 'Kadapa' },
      { id: 5, state_id: 2, name: 'Warangal' },
      { id: 6, state_id: 2, name: 'Hyderabad' },
      { id: 7, state_id: 2, name: 'Karimnagar' },
      { id: 8, state_id: 2, name: 'Kadapa' },
      { id: 9, state_id: 3, name: 'SOMA' },
      { id: 10, state_id: 3, name: 'Richmond' },
      { id: 11, state_id: 3, name: 'Sunset' },
      { id: 12, state_id: 4, name: 'Burbank' },
      { id: 13, state_id: 4, name: 'Hollywood' },
      { id: 14, state_id: 5, name: 'Sunset' },
      { id: 15, state_id: 5, name: 'Burbank' },
      { id: 16, state_id: 5, name: 'Hollywood' },
      { id: 17, state_id: 6, name: 'Benalla' },
      { id: 18, state_id: 6, name: 'Melbourne' },
      { id: 19, state_id: 7, name: 'Chennai' },
      { id: 20, state_id: 7, name: 'Madurai' },
      { id: 21, state_id: 7, name: 'Erode' },
      { id: 22, state_id: 7, name: 'Salem' },
      { id: 23, state_id: 7, name: 'Virudhunagar' },
    ]
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  zipPress(event : any){
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  imgSrc:any;
  getMobile(id)
  {
    this.service.viewIndividual(id).subscribe(data=>{
      this.mobile=data[0];
      let imageArr=this.mobile.images.split(",");
      var perfectImage=[];
        for(let i=0;i<imageArr.length;i++)
        {
          perfectImage[i]="data:image/jpeg;base64,"+imageArr[i];
        }
        this.imgSrc=perfectImage[0];
        this.total=this.mobile.price;
        this.mobile.images=perfectImage;
        this.mobiles.push(this.mobile)
        console.log(this.mobiles)
    })
  }
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
    this.total += this.mobiles[index].price;
  }
  selectedValue:string;
  setRadio(value : string) 
  {
    this.selectedValue=value;
  }

  isSelected(name: string): boolean   
  {  
      if (!this.selectedValue) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
      }  
    return (this.selectedValue === name); // if current radio button is selected, return true, else return false  
  }   
  todayDate:any;

model:any = {}
  continueToAddress(){
      this.proceed=false;
      this.mailView=true;
      this.viewMail=false;
      this.addressView=true;
      this.mailEntered=true;
      this.orderCorrect=false;    
  }
  changeMail(){
    this.proceed=false;
    this.orderCorrect=false;
    this.mailView=false;
    this.viewMail=true;
    this.mailEntered=false;
    this.addressView=false;
    this.orderView=false;
    this.paymentView=false;
    this.addressChange=false;
    this.changeOrder=false;
    this.addressEntered=false;
  }
  
  continueToSummary(){
    this.proceed=false;
    let countries = this.getCountries();
    let states = this.getStates();
    let cities = this.getCity();
    for(let i=0;i<countries.length;i++)
    {
      if(countries[i].id==this.address.selectedCountry)
      {
        for(let j=0;j<states.length;j++)
        {
          if(states[j].id==this.address.selectedState)
          {
            for(let z=0;z<cities.length;z++)
            {
              if(cities[z].id==this.address.selectedCity)
              {
                this.address.selectedCountry=countries[i].name;
                this.address.selectedState=states[j].name;
                this.address.selectedCity=cities[z].name;
              }
            }
          }
        }
      }
    }
    this.orderCorrect=false;
    this.mailView=true;
    this.viewMail=false;
    this.addressView=false;
    this.orderView=true;
    this.paymentView=false;
    this.addressEntered=true;
    this.addressChange=true;
  }
  changeAddress()
  {
    this.proceed=false;
    this.orderCorrect=false;
    this.mailView=true;
    this.viewMail=false;
    this.addressView=true;
    this.orderView=false;
    this.paymentView=false;
    this.addressChange=false;
    this.addressEntered=false;
    this.changeOrder=false;

  }

  continueToPayment()
  {
    this.mailView=true;
    this.proceed=true;
    this.addressView=false;
    this.orderCorrect=true;
    this.paymentView=true;
    this.orderView=false;
    this.changeOrder=true;
  }
  changeOrderFunc()
  {
    this.changeOrder=false;
    this.orderView=true;
    this.orderCorrect=false;
  }
  proceedToPay(content)
  {
    this.paymentSucc=true;
    this.mailView=false;
    this.addressChange=false;
    this.changeOrder=false;
    this.paymentView=false;
    this.proceed=false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getAllMobile()
  {
    this.service.getCartMobile().subscribe((data:[])=>{
      this.mobiles=data;
      for(let j=0;j<this.mobiles.length;j++)
      {
        let imageArr=this.mobiles[j].images.split(",");
        var perfectImage=[];
        for(let i=0;i<imageArr.length;i++)
        {
          perfectImage[i]="data:image/jpeg;base64,"+imageArr[i];
        }
        this.total+=this.mobiles[j].price;
        this.imgSrc=perfectImage[0];
        this.mobiles[j].images=perfectImage;
      }
    })
  }

  print(): void {
    let printContents, popupWin;
    window.location.href="/cart"
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    this.todayDate=new Date();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            table{
              border:1px;
            }
          </style>
        </head>
    <body style="align-items:center" onload="window.print();window.close()">
      ${printContents}
    </body>
      </html>`
    );
    popupWin.document.close();
  }
}
