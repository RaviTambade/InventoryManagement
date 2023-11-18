import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../Models/UserDetails';
import { User } from '../Models/User';
import { Role } from '../Models/Role';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  addUser(user:UserDetails):Observable<any>{
    let url="http://localhost:5142/api/user"
    return this.httpClient.post<any>(url,user)
  }
  
  getUserByContact(contactNumber: string): Observable<User> {
    let url = "http://localhost:5142/api/users/username/" + contactNumber;
    return this.httpClient.get<User>(url);
  }
  updateUser(id :number,user: UserDetails): Observable<User> {
    let url = "http://localhost:5142/api/users/" + id ;
    return this.httpClient.put<any>(url,user);
  }

  getUserRole(userId:number):Observable<Role[]>{
    let url="http://localhost:5142/api/roles/userrole/" + userId;
    return this.httpClient.get<Role[]>(url);
  }
  getUser(id:number):Observable<any>{
    let url="http://localhost:5102/api/users/name/" +id
    return this.httpClient.get<any>(url)
  }
  getUserName(id:string):Observable<any>{
    let url="http://localhost:5142/api/users/name/" +id
    return this.httpClient.get<any>(url)
  }
  getUserDetails(employeeId:number):Observable<any>{
    let url="http://localhost:5142/api/users/" +employeeId
    return this.httpClient.get<any>(url)
  }
  deleteUser(aadharId:string):Observable<any>{
    let url="http://localhost:5142/api/users/aadhar/" +aadharId
    return this.httpClient.delete<any>(url)
  }
}
