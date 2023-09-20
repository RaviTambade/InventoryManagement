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

  setSelectedTaskId(id: number) {
    this.selectedTaskIdSubject.next(id);
  }

  getTasks(empid:number):Observable<any>{
    let url ="http://localhost:5112/api/shipment/shipments/" + empid ;
    return this.http.get(url);
  }
  
  getTaskDetails(id:number):Observable<any>{
    let url ="http://localhost:5112/api/shipment/shippingdetails/" + id ;
    return this.http.get(url);
  }
  UpdateStatus(id:number):Observable<any>{
    let url ="http://localhost:5112/api/shipment/updatestatus/" + id ;
    return this.http.get(url);
  } 
  Deliver(id:number):Observable<any>{
    let url ="http://localhost:5112/api/shipment/deliver/" + id ;
    return this.http.get(url);
  } 
  getWeeklyReport(empid:number, period:any):Observable<any>{
    let url ="http://localhost:5112/api/shipment/weeklyreport/" + empid ;
    return this.http.post(url,period);
  } 
  getYearlyReport(empid:number, year:string):Observable<any>{
    let url ="http://localhost:5112/api/shipment/yearlyreport/" + empid+"/"+year ;
    return this.http.get(url);
  } 
  getMonthlyReport(empid:number, period:any):Observable<any>{
    let url ="http://localhost:5112/api/shipment/monthlyreport/" + empid ;
    return this.http.post(url,period);
  } 
}
