import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { UserDetails } from '../Models/UserDetails';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  
  getUserByContact(contactNumber: string): Observable<User> {
    let url = "http://localhost:5102/api/users/username/" + contactNumber;
    return this.httpClient.get<User>(url);
  }
  updateUser(id :number,user: UserDetails): Observable<User> {
    let url = "http://localhost:5102/api/users/" + id ;
    return this.httpClient.put<any>(url,user);
  }

  getUserRole(userId:number):Observable<string>{
    let url="http://localhost:5140/api/employees/role/" + userId;
    return this.httpClient.get<string>(url);
  }
  getUser(id:number):Observable<any>{
    let url="http://localhost:5102/api/users/name/" +id
    return this.httpClient.get<any>(url)
  }
  getUserDetails(employeeId:number):Observable<any>{
    let url="http://localhost:5102/api/users/" +employeeId
    return this.httpClient.get<any>(url)
  }
  deleteUser(aadharId:string):Observable<any>{
    let url="http://localhost:5102/api/users/aadhar/" +aadharId
    return this.httpClient.delete<any>(url)
  }
}
