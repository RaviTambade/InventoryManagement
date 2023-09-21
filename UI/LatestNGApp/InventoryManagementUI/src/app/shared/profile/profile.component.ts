import { Component } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { User } from 'src/app/Models/User';
import { UserDetails } from 'src/app/Models/UserDetails';
import { UpdatePassword } from 'src/app/Models/update-password';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  employee: Employee = {
    userId: 0,
    hireDate: new Date(),
    imageUrl: '',
    department: '',
    role: '',
    name: ''
  }
  credential:UpdatePassword={
    oldPassword: '',
    newPassword: ''
  }

  confirmPassword: string = '';
  showPopUp: boolean = false;
  user: UserDetails = {
    id: 0,
    aadharId: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: '',
    email: '',
    contactNumber: '',
    imageUrl: ''
  }
  imgurl: string = './assets/img/fEmp.jpeg'

  constructor(private usrsvc: UserService, private empsvc: EmployeeService,private authSvc : AuthenticationService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem("userId");
    if (userId != null) {
      this.usrsvc.getUserDetails(parseInt(userId)).subscribe((res) => {
        console.log(res);
        this.user = res;
      })

      this.empsvc.getEmployee(parseInt(userId)).subscribe((res) => {
        console.log(res);
        this.employee = res;
      })
    }
  }

  changePassword() {
    this.showPopUp = true;
  }
  onPopupCancel() {
    this.showPopUp = false;

  }
  onPopupOk() {
    if(this.credential.newPassword!==this.confirmPassword)
    {
      alert ("wrong password")
    }
    else{
      this.showPopUp = false;
      if (this.credential.newPassword === this.confirmPassword) {
  
        this.authSvc.updatePassword(this.credential).subscribe((response) => {
          console.log(response);
          if (response) {
            alert("Password changed")
          }
          else {
            alert("OldPassword is wrong")
          }
        })
      }  else{
        alert("password dosen't match")
      }
    }
  }
}
