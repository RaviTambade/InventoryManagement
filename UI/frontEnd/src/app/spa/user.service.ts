import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) {}

    addUser(user:User):Observable<any>{
    let url="http://localhost:5102/api/user"
    return this.httpClient.post<any>(url,user)
  }
  getUserIdByContact(contactNumber: string): Observable<number> {
    let url = "http://localhost:5102/api/users/userid/" + contactNumber;
    return this.httpClient.get<number>(url);
  }

  updateUser(id:number,user:User):Observable<any>{
    let url="http://localhost:5102/api/users/" +id;
    return this.httpClient.put<any>(url,user)
  }

  getUser(id:number):Observable<any>{
    let url="http://localhost:5102/api/users/" +id
    return this.httpClient.get<any>(url)
  }
  
  getallUser():Observable<any>{
    let url="http://localhost:5102/api/users"
    return this.httpClient.get<any>(url)
  }
  removeUser(userId:number):Observable<any>{
    let url="http://localhost:5102/api/users/" +userId 
    return this.httpClient.delete<any>(url)
  }
}
