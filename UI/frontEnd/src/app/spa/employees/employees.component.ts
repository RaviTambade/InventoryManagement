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
  employee:any;
  users:User[];
  data:User[];
  userids:any[];

  constructor(private _empsvc:EmployeeService,private _usrsvc:UserService){
    this.employees=[];
    this.users=[];
    this.userids=[];
    this.data=[];
  }
  ngOnInit():void{
    this._usrsvc.getallUser().subscribe((res)=>{
      this.users=res;

      this.users.forEach(item=>{
        this.userids.push(item.id);
        console.log(this.userids)
      })
      this.getEmployees()
    })
    
  }


  bindData(){
    console.log("insided")
    
this.users.forEach((item) => {
    console.log(item);
    console.log(this.users)
    this.employees.forEach((emp)=>{
      if(emp.userId==item.id){
        console.log("yes")
      }
    })
});
  //  this.users.forEach(item=>{
  //   console.log("indloop");
  //   let emp=this.employees.find(element=>element.userId=item.id);
  //     console.log(emp);
  //   })
      // if(this.employee){
      //   this.employee.birthDate=item.birthDate;
      //   this.employee.employeeFirstName=item.firstName;
      //   this.employee.employeeLastName=item.lastName;
      //   this.employee.gender=item.gender;
      //   this.employee.contactNumber=item.contactNumber;
      //   this.employee.email=item.email;
      // }

    

      // inventory.find(e => e.name === 'apples');

    // console.log(this.employees)
  }
    
  getEmployees(){
    console.log("fn")
     this.userids.forEach(item=>{
      this._empsvc.getEmployee(item).subscribe((res)=>{
        this.employees.push(res);
      })
    })
    console.log(this.employees);
    this.bindData();
}

}




// ngOnInit():void{
//   this._empsvc.getEmployees().subscribe((res)=>{
//     this.employees=res;

//     this.employees.forEach(item=>{
//       this.userids.push(item.userId);
//       console.log(this.userids)
//     })
//     this.getUsers()
//   })
  
// }


// bindData(){
//   console.log("insided")

// this.employees.forEach((item) => {
//   console.log(item);
//   console.log(this.users)
//   let user=this.users.find(element=>element.id==item.userId);
//   console.log(user);
// });
// //  this.users.forEach(item=>{
// //   console.log("indloop");
// //   let emp=this.employees.find(element=>element.userId=item.id);
// //     console.log(emp);
// //   })
//     // if(this.employee){
//     //   this.employee.birthDate=item.birthDate;
//     //   this.employee.employeeFirstName=item.firstName;
//     //   this.employee.employeeLastName=item.lastName;
//     //   this.employee.gender=item.gender;
//     //   this.employee.contactNumber=item.contactNumber;
//     //   this.employee.email=item.email;
//     // }

  

//     // inventory.find(e => e.name === 'apples');

//   // console.log(this.employees)
// }
  
//  getUsers(){
//   console.log("fn")
//    this.userids.forEach(item=>{
//     this._usrsvc.getUser(item).subscribe((res)=>{
//       this.users.push(res);
//     })
//   })
//   console.log(this.users);
//   console.log(this.employee);
//   this.bindData();
// }