import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent  {

  login={
    "email":'',
    "password":''
  };
  status: boolean | undefined;

  constructor(private svc:AppService) { }

 

  Login(_loginForm:any){
    this.svc.Login(this.login).subscribe((Response)=>{
      this.status=Response;
      console.log(Response);
    })
  }

}
