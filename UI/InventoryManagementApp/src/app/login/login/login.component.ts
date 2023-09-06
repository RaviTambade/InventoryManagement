import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/store-worker/Services/auth.service';
import { Credential } from '../Credential';
import { Employee } from 'src/app/shared/Employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  credential: Credential = {
    contactNumber: '',
    password: ''
  }
  role: string = '';
  userId: number | undefined;
  employee = new Employee(
    1, // userId
    new Date(), // hireDate
    '', // imageUrl
    '', // department
    '' // role
  );

  constructor(private svc: AuthService, private router: Router, private usersvc: UserService, private empsvc: EmployeeService) { }

  onLogin(form: any) {
    console.log(form);
    this.svc.validate(form).subscribe((response) => {
      if (response.token != null) {
        localStorage.setItem("jwt", response.token)

        this.usersvc.getUserIdByContact(this.credential.contactNumber).subscribe((responseId) => {
          this.userId = responseId;
          localStorage.setItem("userId", this.userId.toString())
          console.log("🚀 ~ this.svc.getUserIdByContact ~ userId:", this.userId);


          this.empsvc.getEmployee(responseId).subscribe((res) => {
            this.employee = res;
            localStorage.setItem("role", this.employee.role);
            // remove magical strings const strings
            if (this.employee.role == "Store Manager") {
              this.router.navigate(['storemanager/dashboard']);
            }
            if (this.employee.role == "Supervisor") {
              this.router.navigate(['supervisor/dashboard']);
            }
            if (this.employee.role == "Store Incharge") {
              this.router.navigate(['storeincharge/dashboard']);
            }
            if (this.employee.role == "Store Worker") {
              this.router.navigate(['storeworker/dashboard']);
            }
          });
        });
      }
      else {
        alert("Incorrect Credentials");
      }
    });
  }

}
