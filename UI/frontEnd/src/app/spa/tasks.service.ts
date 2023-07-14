import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  
  getTasksHistory(empid:number):Observable<any>{
    let url ="http://localhost:5070/api/shipping/getshipments/" + empid ;
    return this.http.get(url);
  }
  getTaskDetails(taskid:number):Observable<any>{
    let url ="http://localhost:5070/api/shipping/getshippingdetails/" + taskid ;
    return this.http.get(url);
  }
 
}
