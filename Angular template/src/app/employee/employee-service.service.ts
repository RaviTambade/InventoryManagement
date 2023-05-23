import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './Employee';
import { Order } from 'app/order/Order';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private http:HttpClient) { }
  private subject = new Subject<any>();

  getAll():Observable<any>
  {
    let url =" http://localhost:5224/api/employees/getallemployees";
    return this.http.get(url); 
  }
  insertEmployee(employee:Employee):Observable<any>
  {
    console.log(employee);
    let url ="http://localhost:5224/api/employees/insertEmployee";
    return this.http.post<Employee>(url, employee);
  }
  getById(employeeId:number):Observable<Employee>
  {
    let url ="http://localhost:5224/api/employees/getemployee/"+ employeeId ;
    return this.http.get<Employee>(url);
  }
  UpdateEmployee(employee:Employee):Observable<any>{
    console.log("service");
    console.log(employee)
    let url ="http://localhost:5224/api/employees/updateEmployee";
    return this.http.put<Employee>(url,employee);
  }  
  SendData(employeeId:number)
  {
    let url ="http://localhost:5224/api/employees/getemployeeForUpdate/"+ employeeId ;
    this.http.get(url).subscribe((data) =>{
      console.log(data);
      this.subject.next({data});
    });
  }
  getData():Observable<any>{
    return this.subject.asObservable()
  }
  getOrders(employeeId:number):Observable<any>{

    let url ="http://localhost:5082/api/orders/ordershistory/"+ employeeId ;
    return this.http.get<Order>(url);    
  }
  getTasks(empid:number):Observable<any>{
    let url ="http://localhost:5082/api/orders/Taskshistory/"+ empid ;
    return this.http.get<Order>(url);   
  }
}
