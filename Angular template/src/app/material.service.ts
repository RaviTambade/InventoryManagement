import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
