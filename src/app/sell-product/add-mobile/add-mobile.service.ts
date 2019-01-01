import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'
import { MapperComponent } from '../../mapper/mapper.component'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AddMobileService {

  constructor(private http: HttpClient) { }
  getVersion(os:any)
  {
    const url = "http://localhost:5000/version?&os=" + os;
    return this.http.get(url);
  }

  addMobile(mobile : any)
  {
    console.log(mobile);
    return this.http.post(MapperComponent.endPointURL+"/add",mobile,httpOptions).subscribe((data:any)=>{
      console.log(data)
    });
  }

  updateMobile(mobile:any)
  {
    return this.http.put(MapperComponent.endPointURL+"/update",mobile,httpOptions).subscribe((data:any)=>{
      console.log(data)
    });
  }
}
