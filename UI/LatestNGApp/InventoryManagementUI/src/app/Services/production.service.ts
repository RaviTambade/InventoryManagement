import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor( private http :HttpClient ) { }

  getAll():Observable<any>{
    let url ="http://localhost:5059/api/production/productionstaffs";
    return this.http.get(url);
  }
}
