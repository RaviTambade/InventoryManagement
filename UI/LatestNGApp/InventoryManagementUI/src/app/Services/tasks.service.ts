import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  private selectedTaskIdSubject = new BehaviorSubject<any>(null);
  selectedTaskId$ = this.selectedTaskIdSubject.asObservable();

  setSelectedRequestId(id: number) {
    this.selectedTaskIdSubject.next(id);
  }

  getTasks(empid:number):Observable<any>{
    let url ="http://localhost:5112/api/shipment/shipments/" + empid ;
    return this.http.get(url);
  }
  
  getTaskDetails(taskid:number):Observable<any>{
    let url ="http://localhost:5112/api/shipping/getshippingdetails/" + taskid ;
    return this.http.get(url);
  }
  UpdateStatus(id:number):Observable<any>{
    let url ="http://localhost:5112/api/shipping/updatestatus/" + id ;
    return this.http.get(url);
  } 
  Deliver(id:number):Observable<any>{
    let url ="http://localhost:5112/api/shipping/deliver/" + id ;
    return this.http.get(url);
  } 
  getWeeklyReport(empid:number, period:any):Observable<any>{
    let url ="http://localhost:5112/api/shipping/weeklyreport/" + empid ;
    return this.http.post(url,period);
  } 
  getYearlyReport(empid:number, year:string):Observable<any>{
    let url ="http://localhost:5112/api/shipping/yearlyreport/" + empid+"/"+year ;
    return this.http.get(url);
  } 
  getMonthlyReport(empid:number, period:any):Observable<any>{
    let url ="http://localhost:5112/api/shipping/monthlyreport/" + empid ;
    return this.http.post(url,period);
  } 


}
