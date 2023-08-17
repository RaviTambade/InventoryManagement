import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  
  getTasks(empid:number):Observable<any>{
    let url ="http://localhost:5070/api/shipping/getshipments/" + empid ;
    return this.http.get(url);
  }
  getTasksHistory(empid:number):Observable<any>{
    let url ="http://localhost:5070/api/shipping/getshipped/" + empid ;
    return this.http.get(url);
  }
  getTaskDetails(taskid:number):Observable<any>{
    let url ="http://localhost:5070/api/shipping/getshippingdetails/" + taskid ;
    return this.http.get(url);
  }
  UpdateStatus(id:number):Observable<any>{
    let url ="http://localhost:5070/api/shipping/updatestatus/" + id ;
    return this.http.get(url);
  } 
  Deliver(id:number):Observable<any>{
    let url ="http://localhost:5070/api/shipping/deliver/" + id ;
    return this.http.get(url);
  } 
  getWeeklyReport(empid:number, period:any):Observable<any>{
    let url ="http://localhost:5070/api/shipping/weeklyreport/" + empid ;
    return this.http.post(url,period);
  } 
  getYearlyReport(empid:number, year:string):Observable<any>{
    let url ="http://localhost:5070/api/shipping/yearlyreport/" + empid+"/"+year ;
    return this.http.get(url);
  } 
  getMonthlyReport(empid:number, period:any):Observable<any>{
    let url ="http://localhost:5070/api/shipping/monthlyreport/" + empid ;
    return this.http.post(url,period);
  } 

}
