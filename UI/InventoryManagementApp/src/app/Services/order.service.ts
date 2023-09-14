import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }
 
  getOrders(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/order/orders/" +empid ;
    return this.http.get(url);
  }

  getCompletedOrders(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/order/completed/orders/" +empid ;
    return this.http.get(url);
  }
  // fn name
  Approve(orderid:number,quantity:number):Observable<any>{
    let url ="http://localhost:5164/api/order/approve/" +orderid+"/"+quantity ;
    return this.http.get(url);
  }
  
  getOrderDetails(requestid:number,storemanagerid:number):Observable<any>{
    let url ="http://localhost:5164/api/order/orders/details/" +requestid+"/" + storemanagerid  ;
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
  order(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/request/request/" +empid ;
    return this.http.get(url);
  }
// url name casing  
  getOrdersHistory(id:number):Observable<any>{
    let url ="http://localhost:5082/api/Orders/history/" + id ;
    return this.http.get(url);
  }
  getRequestHistory(request:any):Observable<any>{
    let url ="http://localhost:5082/api/Orders/requestdetails"  ;
    return this.http.post(url,request);
  } 
}
