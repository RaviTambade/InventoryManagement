import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http:HttpClient) { }
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  order(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/orders/order/" +empid ;
    return this.http.get(url);
  }

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
  getRequests(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/requests/" + empid ;
    return this.http.get(url);
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

  getById(materialId:number):Observable<any>{
    let url ="http://localhost:5176/api/Materials/materials/"+ materialId;
    return this.http.get(url);
  }

  getRequestDetails(requestid:number):Observable<any>
  {
    let url ="http://localhost:5082/api/carts/requestdetails/"+ requestid;
    return this.http.get(url)
  }
  getOrderDetails(orderid:number)
  {
    console.log(orderid)
    let url ="http://localhost:5082/api/orders/orders/details/"+ orderid;

     this.http.get(url).subscribe((data)=>{
      console.log(data);
      this.subject2.next({data});
    })
  }
  getOrdersHistory(id:number):Observable<any>{
    let url ="http://localhost:5082/api/Orders/history/" + id ;
    return this.http.get(url);
  }
  
  getAllMaterials():Observable<any> 
  {
    let url = "http://localhost:5176/api/Materials/materials";
    return this.http.get(url);
  }


  clearData() {
    this.subject.next(" ");
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
  GetDetails(): Observable<any> {

    return this.subject2.asObservable();
  }



}
