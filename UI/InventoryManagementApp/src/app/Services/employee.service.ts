import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../shared/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http:HttpClient) { }
  
  getEmployees():Observable<Employee>{
    let url ="http://localhost:5224/api/employees/employees"  ;
    return this.http.get<Employee>(url);
  }
  getEmployee(id:number):Observable<Employee>{
    let url ="http://localhost:5224/api/employees/employee/" +id ;
    return this.http.get<Employee>(url);
  }
  getRole(id:number):Observable<Employee>{
    let url ="http://localhost:5224/api/employees/role/"+id  ;
    return this.http.get<Employee>(url);
  }

}
