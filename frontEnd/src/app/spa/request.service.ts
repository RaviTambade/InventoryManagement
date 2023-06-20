import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  getRequestDetails(requestid:number):Observable<any>
  {
    let url ="http://localhost:5082/api/requests/requestdetails/"+ requestid;
    return this.http.get(url)
  }
  getCartFromRequest(orderid:number){
    let url ="http://localhost:5082/api/requests/request/cart/" + orderid ;
    return this.http.get(url);
  }
  updateQuantityOfCartFromRequest(updateQuantity:any):Observable<any>{
    let url ="http://localhost:5082/api/requests/request/cart";
    return this.http.put(url,updateQuantity);
  }
  getAllRequests(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/requests/requests/" + empid ;
    return this.http.get(url);
  }
  getAllRequest(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/requests/request/" + empid ;
    return this.http.get(url);
  }
  deleteRequest(reqid:number):Observable<any>{
    let url ="http://localhost:5082/api/requests/delete/request/" + reqid ;
    return this.http.delete(url);
  }
}
