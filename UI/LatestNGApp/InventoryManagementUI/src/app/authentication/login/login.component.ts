import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Credential } from 'src/app/Models/credential';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public currentCount = 0;
  credential: Credential = {
    contactNumber: '',
    password: ''
  }
  userId: number | undefined;
  role: any;

  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  public onSignIn() {
    console.log("Validating user");
    this.authService.validate(this.credential).subscribe((response) => {
      if (response != null) {
        localStorage.setItem("JWT", response.token)
        this.userService.getUserByContact(this.credential.contactNumber).subscribe((response) => {
          this.userId = response.id;
          localStorage.setItem("name", response.name)
          console.log(this.userId);
          this.userService.getUserRole(this.userId).subscribe((response) => {
            this.role = response;
            console.log(this.role);
            const role=this.role.role;
            localStorage.setItem("role", role)
            this.navigateByRole(role);
          })
        })
      }
    })
  }

  navigateByRole(role: string) {
    switch (role) {
      case "Store Incharge":
        this.router.navigate(["storeincharge/dashboard"])
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

