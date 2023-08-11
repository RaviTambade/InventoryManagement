import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Credential } from 'src/app/Credential';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { EmployeeService } from '../../employee.service';
import { Employee } from 'src/app/Employee';

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

  userId: number | undefined;
  // employee: Employee={
  //   "role":'',
  //   "employeeFirstName":'',
  //   "employeeLastName":'',
  //   "birthDate":new Date(),

  // };
  employee:any;

  constructor(private svc: AuthService,private router:Router,private usersvc:UserService,private empsvc:EmployeeService) { }

  onLogin(form: any) {
    console.log(form);
    this.svc.validate(form).subscribe((response) => {
      console.log(response);
      if (response.token != null) {
        localStorage.setItem("jwt", response.token)
        alert("Login sucessfull")

        this.usersvc.getUserIdByContact(this.credential.contactNumber).subscribe((responseId) => {
          this.userId = responseId;
          localStorage.setItem("userId",this.userId.toString())
          console.log("🚀 ~ this.svc.getUserIdByContact ~ userId:", this.userId);

          this.empsvc.getRole(responseId).subscribe((res) => {
            this.employee = res;
            console.log("🚀 ~ this.svc.getRolesOfUser ~ roles:", this.employee?.role);



            if (this.employee!=null) {
              // this.router.navigate()
            }

            if (this.employee?.length < 1) {
              console.log("else")
              // this.router.navigate(['/membership/user/register/', this.credential.contactNumber])
            }
          });
        });
      } 
    });
  }

//   navigateByRole(role: string) {
//     switch (role) {
//       case "Incharge":
//         console.log("I")
//         // this.router.navigate(['/farmer/home/', this.userId])
//         break;

//       case "Store Manager":
//         console.log("sm")
//         break;

//       case "Supervisor":
//         console.log("s")

        
//         break;

//       case "Store Worker":
//         if (this.userId != undefined)
//         console.log("sw")

//         break;

//  }
//   }

  // newAccountStatus() {
  //   return this.roles.length < 1;
  // }
}
