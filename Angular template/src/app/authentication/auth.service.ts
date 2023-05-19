import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Login(login:Login):Observable<any>
  {
    console.log(login);
    let url ="http://localhost:5145/api/login/login";
    return this.http.post<Login>(url, login);
  }
}
