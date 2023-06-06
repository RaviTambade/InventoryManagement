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
    let role = data.role;
    console.log("Service is called");
    console.log(role);

    switch(role){
      case "Incharge":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+role;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
        });
        break;
      }
      case "Store Manager":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ role;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data});
        });
        break;
      }
      case "Supervisor":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ role;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data});
        });
        break;  
      }
      case "Store Worker":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ role;
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
}
