import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }
 
  private selectedOrderIdSubject = new BehaviorSubject<any>(null);
  selectedOrderId$ = this.selectedOrderIdSubject.asObservable();

  setSelectedOrderId(id: number) {
    console.log(id);
    this.selectedOrderIdSubject.next(id);
  }
  getOrders(empid:number):Observable<any>{
    let url =" http://localhost:5108/api/orders/orders/" +empid ;
    return this.http.get(url);
  }

  getCompletedOrders(empid:number):Observable<any>{
    let url ="http://localhost:5108/api/orders/completed/orders/" +empid ;
    return this.http.get(url);
  }
  // fn name
  Approve(orderid:number,quantity:number):Observable<any>{
    let url ="http://localhost:5108/api/orders/approve/" +orderid+"/"+quantity ;
    return this.http.get(url);
  }
  
  getOrderDetails(requestid:number):Observable<any>{
    let url ="http://localhost:5108/api/orders/orders/details/" +requestid   ;
    return this.http.get(url);
  }

  orderHistory(empid:number):Observable<any>{
    let url ="http://localhost:5108/api/orders/details/" +empid ;
    return this.http.get(url);
  }
  orderDetails(orderid:number):Observable<any>{
    let url ="http://localhost:5108/api/orders/detail/" +orderid ;
    return this.http.get(url);
  }
  
// url name casing  
  getOrdersHistory(id:number):Observable<any>{
    let url ="http://localhost:5108/api/Orders/history/" + id ;
    return this.http.get(url);
  }
  getRequestHistory(request:any):Observable<any>{
    let url ="http://localhost:5108/api/Orders/requestdetails"  ;
    return this.http.post(url,request);
  }
  
}
