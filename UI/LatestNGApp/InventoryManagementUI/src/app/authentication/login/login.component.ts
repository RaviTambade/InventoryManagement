import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() validSignIn =new EventEmitter();
  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  public onSignIn() {
    console.log("Validating user");
    this.authService.validate(this.credential).subscribe((response) => {
      console.log(response.token);
      if (response.token != null) {
        this.validSignIn.emit({token:response.token})
        // localStorage.setItem("JWT", response.token)
        // this.userService.getUserByContact(this.credential.contactNumber).subscribe((response) => {
        //   this.userId = response.id;
        //   localStorage.setItem("name", response.name)
        //   localStorage.setItem("userId",  this.userId.toString()) 
        //   console.log(this.userId);
        //   this.userService.getUserRole(this.userId).subscribe((response) => {
        //     console.log(response);
        //     this.role = response[0].name;
        //     console.log(this.role);
        //     const role=this.role;
        //     console.log(role);
        //     localStorage.setItem("role", role)
        //     this.navigateByRole(role);
        //   })
      //   })
      }
    })
  }

 
}

