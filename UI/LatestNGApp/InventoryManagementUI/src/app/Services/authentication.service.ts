import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from '../Models/credential';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UpdatePassword } from '../Models/update-password';
import { TokenClaims } from '../Models/Enums/tokenclaims';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient,
    private jwtHelper: JwtHelperService,
    ) { }
    
  validate(credential: Credential): Observable<any> {
    let url = 'http://localhost:5142/api/auth/signin';
    return this.httpClient.post<any>(url, credential);
  }
  register(credential: Credential): Observable<boolean> {
    let url = "http://localhost:5142/api/auth/register";
    return this.httpClient.post<any>(url, credential);
  }
  getContactNumberFromToken(): string | null {
    const token = localStorage.getItem("JWT");
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.contactNumber;
    }
    return null;
  }
  updatePassword(credential: UpdatePassword): Observable<boolean> {
    let url = "http://localhost:5142/api/auth/update/password";
    const token = localStorage.getItem("JWT")
   const contactNumber= this.getContactNumberFromToken();
   if(contactNumber){
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    .set('contactNumber', contactNumber); // Custom header for contact number
    return this.httpClient.put<any>(url, credential,{headers});

   }else
   return this.httpClient.put<any>(url, credential);
  }


  getClaimFromToken(claim: TokenClaims) {
    let token = localStorage.getItem("JWT");
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken[claim]);
      return decodedToken[claim];
    }
    return null;
  }


  getRolesFromToken():string[]{
    let token = localStorage.getItem("JWT");
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.roles;
      console.log(roles);
      if (Array.isArray(roles)) {
        return roles;
      } else if (typeof roles === 'string') {
        return [roles];
      }
    }
    return [];
  }
}

