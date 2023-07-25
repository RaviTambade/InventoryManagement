import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from 'src/app/Employee';
import { UserService } from '../user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees:Employee[];
  users:User[];
  userids:any[];
  constructor(private _empsvc:EmployeeService,private _usrsvc:UserService){
    this.employees=[];
    this.users=[];
    this.userids=[];
  }
  ngOnInit():void{
    this._empsvc.getEmployees().subscribe((res)=>{
      console.log(res);
      this.employees=res;
      this.employees.forEach
      this.employees.forEach(item=>{
        this.userids.push(item.userId);
      })
      console.log(this.userids);
      // console.log(this.users);
    })

    this.userids.forEach(item=>{
      console.log("inside")
      this._usrsvc.getUser(item).subscribe((res)=>{
        this.users.push(res);
        console.log(this.users);
    })
    })

    
    // this.users.forEach(item=>{
    //   let emp=this.employees.find(element=>{
    //     element.birthDate=item.birthDate;
    //     element.employeeFirstName=item.firstName;
    //     element.employeeLastName=item.lastName;
    //     element.gender=item.gender;
    //     element.contactNumber=item.contactNumber;
    //     element.email=item.email;
    //   })
    // })
    console.log(this.employees);


  }

}
