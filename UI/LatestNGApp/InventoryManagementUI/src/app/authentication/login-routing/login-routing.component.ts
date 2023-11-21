import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login-routing',
  templateUrl: './login-routing.component.html',
  styleUrls: ['./login-routing.component.css']
})
export class LoginRoutingComponent {

  role :any[]=[];
constructor(private router:Router,private authService: AuthenticationService,){}

onReceiveToken(event:any){
  if(event.token){
    localStorage.setItem("JWT",event.token);
    this.role = this.authService.getRolesFromToken();
    console.log(this.role);
      if (this.role?.length == 1) {
        this.navigateByRole(this.role[0]);      
    }
  }
}

  navigateByRole(role: string) {
    console.log(role);
    switch (role) {  
      case "Store Incharge":  
        this.router.navigate(['storeincharge/dashboard'])
        break;
      case "Store Manager":
        this.router.navigate(["storemanager/dashboard"])
        break;
      case "Supervisor":
        this.router.navigate(["supervisor/dashboard"])
        break;
        case "Supervisor Incharge":
        this.router.navigate(["supervisorincharge/dashboard"])
        break;
      case "Store Worker":
        this.router.navigate(["storeworker/dashboard"])
        break;
    }
  }
}
