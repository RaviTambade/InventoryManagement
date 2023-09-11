import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  private selectedRequestIdSubject = new BehaviorSubject<any>(null);
  selectedRequestId$ = this.selectedRequestIdSubject.asObservable();

  setSelectedRequestId(id: number) {
    this.selectedRequestIdSubject.next(id);
  }
 
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
  //url request/request should be only single request/
  getItemFromRequest(id:number){
    let url ="http://localhost:5164/api/request/request/item/" + id ;
    return this.http.get(url);
  }
  updateRequestedItem(item:any):Observable<any>{
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
  //fn name 
  GetWeeklyReport(empid:number,period:any):Observable<any>{
    let url ="http://localhost:5164/api/request/weeklyrequests/" + empid ;
    return this.http.post(url,period);
  }
  GetMonthlyReport(empid:number,period:any):Observable<any>{
    let url ="http://localhost:5164/api/request/monthlyrequests/" + empid ;
    return this.http.post(url,period);
  }
  GetYearlyReport(empid:number,year:string):Observable<any>{
    let url ="http://localhost:5164/api/request/yearlyrequests/" + empid+"/"+year ;
    return this.http.get(url);
  }
}
