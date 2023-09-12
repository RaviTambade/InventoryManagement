import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialRequestService {

  constructor(private http:HttpClient) { }
  
  getCarts(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/InitialRequest/items/" + empid ;
    return this.http.get(url);
  }
  getCart(cartid:number):Observable<any>{
    let url ="http://localhost:5164/api/InitialRequest/item/" + cartid ;
    return this.http.get(url);
  }
  updateQuantity(quantity:any):Observable<any>{
    let url ="http://localhost:5164/api/InitialRequest/item/";
    return this.http.put(url,quantity);
  }

  remove(id:number):Observable<any>{
    let url ="http://localhost:5164/api/InitialRequest/item/" + id ;
    return this.http.delete(url);
  }

  removeAll(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/InitialRequest/items/" + empid ;
    return this.http.delete(url);
  }

  add(cart:any):Observable<any> 
  {
    let url ="http://localhost:5164/api/InitialRequest/item";
    return this.http.post(url,cart);
  }
  //function name case
  // parameter changeStatus => status
  changeStatus(status:any):Observable<any> 
  {
    let url ="http://localhost:5164/api/InitialRequest/ChangeStatus/"  ;
    return this.http.put(url,status);
  }

}
