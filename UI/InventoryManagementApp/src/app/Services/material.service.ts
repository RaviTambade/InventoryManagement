import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Material } from '../supervisor/Models/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {


  constructor(private http:HttpClient) { }

  public response:any;


  getMaterial(materialid:any):Observable<any>{
    console.log(materialid);
      let url ="http://localhost:5071/api/Materials/materials/" +materialid ;
      return this.http.get(url);
  }

  getById(materialId:number):Observable<any>{
    let url ="http://localhost:5071/api/Materials/materials/"+ materialId;
    return this.http.get(url);
  }

  getLocation(materialId:number):Observable<any>{
    let url ="http://localhost:5071/api/Materials/location/"+ materialId;
    return this.http.get(url);
  }

  getCategories():Observable<any>{
    let url ="http://localhost:5071/api/Materials/categories";
    return this.http.get(url);
  }

  InsertMaterial(material:Material):Observable<any>{
    let url ="http://localhost:5071/api/Materials/Materials";
    return this.http.post(url,material);
  }

  updateQuantity(materialId:number, quantity:number):Observable<any>{
    let url ="http://localhost:5071/api/Materials/material/"+ materialId;
    return this.http.put(url,quantity);
  }
  
  getAllMaterials():Observable<any> 
  {
    let url = "http://localhost:5071/api/Materials/materials";
    return this.http.get(url);
  }
  getStockReports(empid:number):Observable<any> 
  {
    let url = "http://localhost:5071/api/Materials/stockreports/"+empid;
    return this.http.get(url);
  }

  getAllStockReports():Observable<any> 
  {
    let url = "http://localhost:5071/api/Materials/stockreports";
    return this.http.get(url);
  }

}
