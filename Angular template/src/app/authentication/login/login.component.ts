import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  login={
    "contactNumber":'',
    "password":''
  };
  status: boolean | undefined;

  constructor(private svc:AuthService ,private router:Router) { }

  LogIn(){
    this.svc.login(this.login).subscribe((response)=>{
         //first save the token in local storage
         console.log(response);
         localStorage.setItem('jwtToken', response.token);
         const decodedRole = this.svc.getRoleFromToken(); //decode role from token which is stored in localstorage
         const decodedEmployeeId = this.svc.getEmployeeIdFromToken();//decode employee id from token which is stored in localstorage
         localStorage.setItem('role', decodedRole);
         localStorage.setItem('employeeId', decodedEmployeeId);
         this.router.navigate(['dashboard']);
    })
  }
}
