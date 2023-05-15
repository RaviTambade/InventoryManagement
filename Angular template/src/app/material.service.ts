import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from './Material';
import { quantity } from 'chartist';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http:HttpClient) { }

  getAllMaterials():Observable<any> 
  {
    let url = "http://localhost:5176/api/Materials/getallmaterials";
    return this.http.get(url);
  }
  getById(materialId:number):Observable<Material>
  {
    let url ="http://localhost:5176/api/Materials/getmaterial/"+ materialId;
    return this.http.get<Material>(url);
  }
  update(material:Material):Observable<any>
  {
    console.log("service called")
    let url ="http://localhost:5176/api/Materials/updateMaterial/"+ material.materialId ;
    console.log(url)
    return this.http.put<Material>(url, material);
    
  }

}
