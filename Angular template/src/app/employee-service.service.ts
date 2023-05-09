import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http:HttpClient) { }

  getAll():Observable<any>
  {
    let url =" http://localhost:5224/api/employees/getallemployees";
    return this.http.get(url); 
  }
  insertEmployee(employee:Employee):Observable<any>
  {
    console.log(employee);
    let url ="http://localhost:5224/api/employees/getallemployees";
    return this.http.post<Employee>(url, employee);
  }
}
