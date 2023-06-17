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
  orderHistory(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/orders/history/" +empid ;
    return this.http.get(url);
  }
  getCarts(id:number){
    let url ="http://localhost:5082/api/carts/carts/" + id ;
    this.http.get(url).subscribe((carts)=>{
      console.log(carts);
      this.subject.next({carts});
    })
  }
  getCart(id:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/cart/" + id ;
    return this.http.get(url);
  }
  getRequests(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/requests/" + empid ;
    return this.http.get(url);
  }
  remove(id:number):Observable<any>{
    let url ="http://localhost:5082/api/carts/delete/" + id ;
    return this.http.delete(url);
  }
  addToCart(cart:any):Observable<any> 
  {
    console.log(cart);
    let url = "http://localhost:5082/api/carts/addtocart";
    return this.http.post(url,cart);
  }
  getById(materialId:number)
  {
    let url ="http://localhost:5176/api/Materials/materials/"+ materialId;
     this.http.get(url).subscribe((data)=>{
      console.log(data);
      this.subject.next({data});
    })
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
