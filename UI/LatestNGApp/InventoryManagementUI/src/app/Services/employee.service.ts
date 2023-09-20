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

}
