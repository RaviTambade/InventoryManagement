import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http:HttpClient) { }
  Order(order:any):Observable<any> 
  {
    let url = "http://localhost:5082/api/orders/order";
    return this.http.post(url,order);
  }
  getById(materialId:number)
  {
    let url ="http://localhost:5176/api/Materials/materials/"+ materialId;
     this.http.get(url).subscribe((data)=>{
      this.subject.next({data});
    })
  }
  getAllMaterials():Observable<any> 
  {
    let url = "http://localhost:5176/api/Materials/materials";
    return this.http.get(url);
  }
  private subject = new Subject<any>();



  clearData() {
    this.subject.next(" ");
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
