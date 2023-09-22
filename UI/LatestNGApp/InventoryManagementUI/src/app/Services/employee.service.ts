import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../Models/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http:HttpClient) { }

  private selectedEmployeeIdSubject = new BehaviorSubject<any>(null);
  selectedEmployeeId$ = this.selectedEmployeeIdSubject.asObservable();

  setSelectedEmployeeId(id: number) {
    console.log(id);
    this.selectedEmployeeIdSubject.next(id);
  }
  getEmployees():Observable<Employee>{
    let url ="http://localhost:5140/api/employees/employees"  ;
    return this.http.get<Employee>(url);
  }
  getEmployee(id:number):Observable<Employee>{
    let url ="http://localhost:5140/api/employees/employee/" +id ;
    return this.http.get<Employee>(url);
  }
  getEmployeesByDepartment(department:string):Observable<Employee[]>{
    let url ="http://localhost:5140/api/employees/department/"+ department  ;
    return this.http.get<Employee[]>(url);
  }
  getRole(id:number):Observable<Employee>{
    let url ="http://localhost:5140/api/employees/role/"+id  ;
    return this.http.get<Employee>(url);
  }
  deleteEmployee(id:number):Observable<Employee>{
    let url ="http://localhost:5140/api/employees/employees/"+id  ;
    return this.http.delete<any>(url);
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
