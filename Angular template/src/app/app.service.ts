import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  Login(login:Login):Observable<any>
  {
    console.log(login);
    let url ="http://localhost:5145/api/login/login";
    return this.http.post<Login>(url, login);
  }
}
