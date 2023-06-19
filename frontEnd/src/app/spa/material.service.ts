import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http:HttpClient) { }

  public response:any;


  getMaterial(materialid:any):Observable<any>{
    console.log(materialid);
      let url ="http://localhost:5176/api/Materials/materials/" +materialid ;
      return this.http.get(url);
  }


  getById(materialId:number):Observable<any>{
    let url ="http://localhost:5176/api/Materials/materials/"+ materialId;
    return this.http.get(url);
  }


  // getOrderDetails(orderid:number)
  // {
  //   console.log(orderid)
  //   let url ="http://localhost:5082/api/orders/orders/details/"+ orderid;

  //    this.http.get(url).subscribe((data)=>{
  //     console.log(data);
  //     this.subject2.next({data});
  //   })
  // }

  
  getAllMaterials():Observable<any> 
  {
    let url = "http://localhost:5176/api/Materials/materials";
    return this.http.get(url);
  }


 



}
