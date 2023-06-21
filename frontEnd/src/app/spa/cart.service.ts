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

  updateQuantity(updateQuantity:any):Observable<any>{
    let url ="http://localhost:5082/api/carts/updatequantity";
    return this.http.put(url,updateQuantity);
  }

  remove(id:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/delete/" + id ;
    return this.http.delete(url);
  }

  removeAll(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/Emptycart/" + empid ;
    return this.http.delete(url);
  }

  addToCart(cart:any):Observable<any> 
  {
    let url = "http://localhost:5082/api/carts/addtocart";
    return this.http.post(url,cart);
  }
  ChangeStatus(changeStatus:any):Observable<any> 
  {
    let url = "http://localhost:5082/api/carts/ChangeStatus";
    return this.http.put(url,changeStatus);
  }

}

