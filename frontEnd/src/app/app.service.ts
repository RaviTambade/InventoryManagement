import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

 getOrders():Observable<any>{
    console.log("Service is called");
    let url ="http://localhost:5082/api/Orders/orderedInADay" ;
    return this.http.get(url);

  }
}
