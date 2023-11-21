import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getRequestCount(date:number,supervisorId:number):Observable<any>{
    let url ="http://localhost:5161/api/bi/requestcount/" +date+ "/"+supervisorId ;
    return this.http.get<any>(url);
  }

  getOrderCount(date:number,storeManagerId:number):Observable<any>{
    let url ="http://localhost:5161/api/bi/ordercount/" +date+ "/"+storeManagerId ;
    return this.http.get<any>(url);
  }

  getRequestByStatus():Observable<any>{
    let url ="http://localhost:5161/api/bi/requests";
    return this.http.get<any>(url);
  }
  
  getSupervisors():Observable<any>{
    let url ="http://localhost:5161/api/bi/supervisors";
    return this.http.get<any>(url);
  }

  getTotalAndCounts():Observable<any>{
    let url ="http://localhost:5161/api/bi/materials";
    return this.http.get<any>(url);
  }

  getMaterialRequestBySupervisor(supervisorId:number):Observable<any>{
    let url ="http://localhost:5161/api/bi/supervisorrequest/" +supervisorId ;
    return this.http.get<any>(url);
  }

  getAllOrdersCount():Observable<any>{
    let url ="http://localhost:5161/api/bi/allorderstatus" ;
    return this.http.get<any>(url);
  }
}
