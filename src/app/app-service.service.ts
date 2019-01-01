import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'
import { MapperComponent } from './mapper/mapper.component'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) { }

  gettingAns()
  {
    return this.http.get(MapperComponent.endPointURL+"/api");
  }

  getAll()
  {
    return this.http.get(MapperComponent.endPointURL+"/getAll")
  }

  deleteMobile(id:any)
  {
    return this.http.delete(MapperComponent.endPointURL+"/deleteMobile?&id="+id).subscribe((data:any)=>{
      console.log(data);
    })
  }

  viewIndividual(id)
  {
      return this.http.get(MapperComponent.endPointURL+"/viewMobile?&id="+id);
  }

  addToCart(id)
  {
    return this.http.get(MapperComponent.endPointURL+"/addToCart?&id="+id);
  }

  getCartItem()
  {
    return this.http.get(MapperComponent.endPointURL+"/getCart")
  }
  getCartMobile()
  {
    return this.http.get(MapperComponent.endPointURL+"/getCartMobile");
  }
  removeMobileFromCart(id:number)
  {
    return this.http.get(MapperComponent.endPointURL+"/deleteMobile?&id="+id)
  }
}
