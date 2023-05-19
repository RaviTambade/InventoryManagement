import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  login={
    "email":'',
    "password":''
  };
  status: boolean | undefined;

  constructor(private svc:AuthService) { }

 

  Login(_loginForm:any){
    this.svc.Login(this.login).subscribe((Response)=>{
      this.status=Response;
      console.log(Response);
    })
  }
}
