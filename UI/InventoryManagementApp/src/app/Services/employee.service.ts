import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http:HttpClient) { }
  
  // return actual type insted of any
  getEmployees():Observable<any>{
    let url ="http://localhost:5224/api/employees/employees"  ;
    return this.http.get(url);
  }
  getEmployee(id:number):Observable<any>{
    let url ="http://localhost:5224/api/employees/employee/" +id ;
    return this.http.get(url);
  }
  getRole(id:number):Observable<any>{
    let url ="http://localhost:5224/api/employees/role/"+id  ;
    return this.http.get(url);
  }

}
