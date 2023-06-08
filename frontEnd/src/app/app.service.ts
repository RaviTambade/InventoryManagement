import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private subject = new Subject<any>();

  constructor(private http:HttpClient) { }

 getOrders():Observable<any>{
    let url ="http://localhost:5082/api/Orders/orderedInADay" ;
    return this.http.get(url);

  }
  getOrderDetails(id :number):Observable<any>{
    let url ="http://localhost:5082/api/orders/orders/History/" +id ;
    return this.http.get(url);
  }

  sendData(data:any){
    let role = data.roleName;
    switch(role){
      case "Incharge":{
        let url =" http://localhost:5224/api/employees/role/"+role;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
        });
        break;
      }
      case "Store Manager":{
        let url =" http://localhost:5224/api/employees/role/"+ role;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data});
        });
        break;
      }
      case "Supervisor":{
        let url =" http://localhost:5224/api/employees/role/"+ role;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data});
        });
        break;  
      }
      case "Store Worker":{
        let url =" http://localhost:5224/api/employees/role/"+ role;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data});
        });
        break;  
      }

    }

  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  getOrderHistoryByDate(period:any):Observable<any>{
    let url ="http://localhost:5082/api/Orders/orderedFromDateToDate" ;
    return this.http.post(url,period);
  }

  getByGender(gender:any):Observable<any>{
    let url ="http://localhost:5224/api/employees/gender/"+ gender ;
    return this.http.get(url);
  }

  getCountries() {
    //return this.countryData.getCountries();
    let countries=[
        {"name":"India","shortName": "IN"},
        {"name":"China","shortName": "Chin"},
        {"name":"America","shortName": "USA"},
    ]
    return countries;
  }


  getStatesByCountry(country: string):any {
   let  states:any;
    switch(country){
        case "India":
        states=["Maharashtra", "Gujrat","Goa"];
        return  states;
        break;
        case "China":
        states=["Zhejiang","Sichuan","Fujian"];

        break;
        case "America":
        states=["California","Texas","Florida"];
        break;
    }
    return states;
  }

  getCitiesByState(state: string) {
    let cities:any;
    switch(state){
      case "Maharashtra":
      cities=["Pune", "Ratnagiri","Mumbai"];
      return  cities;
      break;
      case "Zhejiang":
      cities=["Hangzhou","Huzhou","Jiaxing"];
      return cities;
      break;
      case "California":
      cities=["Los Angeles","San Francisco","San Diego"];
      return cities;
      break;

  }
    return  cities;
  }

  getMaterialInfo():Observable<any>{
    let url ="http://localhost:5176/api/Materials/locations" ;
    return this.http.get(url);
  }
}
