import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/login/login/User';
import { Employee } from '../Employee';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

   employee: Employee = new Employee(
    1, // userId
    new Date(), // hireDate
    '', // imgUrl
    '', // department
    '' // role
);

user: User = new User(
  1, // id
  '', // aadharId
  '', // firstName
  '', // lastName
  new Date(''), // birthDate
  '', // gender
  '', // email
  '' // contactNumber
);
imgurl:string='./assets/img/fEmp.jpeg'

  constructor(private usrsvc:UserService, private empsvc:EmployeeService){}

  ngOnInit(): void {
    const userId= localStorage.getItem("userId");
    if(userId!=null){
      this.usrsvc.getUser(parseInt(userId)).subscribe((res)=>{
        console.log(res);
        this.user=res;
      })
  
      this.empsvc.getEmployee(parseInt(userId)).subscribe((res)=>{
        console.log(res);
        this.employee=res;
      })
    }


  }
}
