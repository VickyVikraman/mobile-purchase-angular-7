import { Component } from '@angular/core';
import  {AppServiceService}   from './app-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Purchase';
  data:any;
  constructor(private service : AppServiceService)
  {

  }
  clicked()
  {
    this.service.gettingAns().subscribe((data:any)=>{
      this.data=data.message
    });
  }
}
