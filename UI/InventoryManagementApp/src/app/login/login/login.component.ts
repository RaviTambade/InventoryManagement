import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/store-worker/Services/auth.service';
import { Credential } from '../Credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // remove console.log() after testing is complete
  //remove unwanted code  
  credential: Credential = {
    contactNumber: '',
    password: ''
  }
  role:string='';
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
       
      
          this.empsvc.getEmployee(responseId).subscribe((res) => {
            this.employee = res;
            console.log("🚀 ~ this.svc.getRolesOfUser ~ roles:", this.employee?.role);
            localStorage.setItem("role",this.employee.role);
            // remove magical strings const strings
            if(this.employee.role=="Store Manager"){
              this.router.navigate(['storemanager/dashboard']);
            }
            if(this.employee.role=="Supervisor"){
              this.router.navigate(['supervisor/dashboard']);
            }
            if(this.employee.role=="Store Worker"){
              this.router.navigate(['storeworker/dashboard']);
            }

          });
        
        });

        
      } 
      else{
        alert("Incorrect Credentials");
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
