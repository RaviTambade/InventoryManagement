import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestDetails } from '../Models/RequestDetails';

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
 

  // getAllRequests(empid:number):RequestDetails[]{
  //   console.log("requests");
  //   var request :RequestDetails[]=[
  //     {id:1, date:'2023/09/11T12:21:16',status:'Delivered' ,name:'pragati bangar', userId:1},
  //     {id:2, date:'2023/09/11T12:24:16' ,status:'Cancelled',name:'ovi pokharkar', userId:2},
  //     {id:3, date:'2023/09/11T12:27:16' ,status:'Inprogress',name:'shri tavhare', userId:3},
  //     {id:4, date:'2023/09/11T12:21:16',status:'Delivered',name:'shyam barve', userId:4},
  //     {id:5, date:'2022/09/05T12:21:16',status:'Inprogress',name:'seeta bhor', userId:5},
  //     {id:6, date:'2022/09/11T12:21:16' ,status:'Delivered',name:'geeta borhade', userId:6},
  //     {id:7, date:'2022/09/09T12:21:16',status:'Cancelled',name:'ramesh minde', userId:8},
  //   ];
  //   return request;
  // }
  
}
