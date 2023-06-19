import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  
  getCarts(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/carts/" + empid ;
    return this.http.get(url);
  }
  getCart(cartid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/cart/" + cartid ;
    return this.http.get(url);
  }
  getCartFromRequest(orderid:number){
    let url ="http://localhost:5082/api/carts/request/cart/" + orderid ;
    return this.http.get(url);
  }
  updateQuantity(updateQuantity:any):Observable<any>{
    let url ="http://localhost:5082/api/carts/updatequantity";
    return this.http.put(url,updateQuantity);
  }
  updateQuantityOfCartFromRequest(updateQuantity:any):Observable<any>{
    let url ="http://localhost:5082/api/carts/request/cart";
    return this.http.put(url,updateQuantity);
  }
  getRequests(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/requests/" + empid ;
    return this.http.get(url);
  }
  remove(id:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/delete/" + id ;
    return this.http.delete(url);
  }
  deleteRequest(reqid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/delete/request/" + reqid ;
    return this.http.delete(url);
  }
  removeAll(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/Emptycart/" + empid ;
    return this.http.delete(url);
  }
  getRequestDetails(requestid:number):Observable<any>
  {
    let url ="http://localhost:5082/api/carts/requestdetails/"+ requestid;
    return this.http.get(url)
  }
  addToCart(cart:any):Observable<any> 
  {
    let url = "http://localhost:5082/api/carts/addtocart";
    return this.http.post(url,cart);
  }

}

