import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
 
  getOrders(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/request/requests/store/" +empid ;
    return this.http.get(url);
  }
  
  getOrderDetails(orderId:number):Observable<any>{
    let url ="http://localhost:5082/api/orders/orders/details/" +orderId ;
    return this.http.get(url);
  }

  orderHistory(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/orders/details/" +empid ;
    return this.http.get(url);
  }
  orderDetails(orderid:number):Observable<any>{
    let url ="http://localhost:5082/api/orders/detail/" +orderid ;
    return this.http.get(url);
  }
  //get order details by sending request id (store)
  // getOrderDetails(requestid:number):Observable<any>{
  //   let url ="http://localhost:5082/api/orders/details/request/" +requestid ;
  //   return this.http.get(url);
  // }
  order(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/request/request/" +empid ;
    return this.http.get(url);
  }

  getOrdersHistory(id:number):Observable<any>{
    let url ="http://localhost:5082/api/Orders/history/" + id ;
    return this.http.get(url);
  }
  getRequestHistory(request:any):Observable<any>{
    let url ="http://localhost:5082/api/Orders/requestdetails"  ;
    return this.http.post(url,request);
  }
}
