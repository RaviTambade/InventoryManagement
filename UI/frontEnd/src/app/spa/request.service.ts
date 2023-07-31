import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDetails } from '../RequestDetails';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  getRequestDetails(requestid:number):Observable<any>
  {
    let url ="http://localhost:5164/api/request/requestdetails/"+ requestid;
    return this.http.get(url)
  }
  getRequestId(empid:number):Observable<any>
  {
    let url ="http://localhost:5082/api/requests/requestid/"+ empid;
    return this.http.get(url)
  }
  getItemFromRequest(id:number){
    let url ="http://localhost:5164/api/request/request/item/" + id ;
    return this.http.get(url);
  }
  updateRequestedItem(item:RequestDetails):Observable<any>{
    let url ="http://localhost:5164/api/request/request/item";
    return this.http.put(url,item);
  }
  getAllRequests(empid:number):Observable<any>{
    let url ="http://localhost:5164/api/request/requests/" + empid ;
    return this.http.get(url);
  }
  getAllRequest(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/requests/request/" + empid ;
    return this.http.get(url);
  }
  deleteRequest(reqid:number):Observable<any>{
    let url ="http://localhost:5164/api/request/delete/request/" + reqid ;
    return this.http.delete(url);
  }
  cancelRequest(reqid:number):Observable<any>{
    let url ="http://localhost:5164/api/request/cancel/" + reqid ;
    return this.http.delete(url);
  }
  removeItem(id:number):Observable<any>{
    let url ="http://localhost:5164/api/request/item/" + id ;
    return this.http.delete(url);
  }
  GetWeeklyReport(empid:number,period:any):Observable<any>{
    let url ="http://localhost:5164/api/request/weeklyorders/" + empid ;
    return this.http.post(url,period);
  }
}
