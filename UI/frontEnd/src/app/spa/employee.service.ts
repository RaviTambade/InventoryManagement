import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    let url = "http://localhost:5224/api/employees/employees";
    return this.http.get(url);
  }
  getEmployee(id: number): Observable<any> {
    let url = "http://localhost:5224/api/employees/employee/" + id;
    return this.http.get(url);
  }
  getRole(id: number): Observable<any> {
    let url = "http://localhost:5224/api/employees/role/" + id;
    return this.http.get(url);
  }
  getDepartments(): Observable<string[]> {
    let url = "http://localhost:5140/api/employees/departments";
    return this.http.get<string[]>(url);
  }
  getRoles(): Observable<string[]> {
    let url = "http://localhost:5140/api/employees/roles";
    return this.http.get<string[]>(url);
  }
  addEmployee(employee:Employee): Observable<any> {
    let url = "http://localhost:5140/api/employees/employee";
    return this.http.post(url, employee);
  }
 
}
