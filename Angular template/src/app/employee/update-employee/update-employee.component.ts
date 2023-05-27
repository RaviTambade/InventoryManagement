import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent  {

  subscription: Subscription|undefined;

  employee={
    "employeeId":1,
    "employeeFirstName":'',
    "employeeLastName":'',
    "birthDate": new Date(),
    "hireDate":new Date(),
    "contactNumber":'',
    "email":'',
    "password":'',
    "imgUrl":'',
    "gender":'',
    "department":'',
    "role":'',
    "genderId":0,
    "roleId":0,
    "departmentId":0
 };
 status: boolean | undefined;

 constructor(private svc:EmployeeServiceService) { }

ngOnInit(): void {
  this.subscription = this.svc.getData().subscribe((response) =>{
    this.employee = response.data;
    console.log("emp")
    console.log(this.employee);
    console.log("res")
    console.log( response.data);
  })}

 Update(_UpdateForm:any){
   console.log("emp" + this.employee);
   this.employee.genderId = Number.parseInt( this.employee.gender);
   this.employee.roleId = Number.parseInt( this.employee.role);
   this.employee.departmentId = Number.parseInt( this.employee.department);
   
   this.employee.gender ="null";
   this.employee.role ="null";
   this.employee.department ="null";
   this.employee.password ="null";
    console.log(this.employee)
   this.svc.UpdateEmployee(this.employee).subscribe((Response)=>{
     this.status=Response;
     console.log(Response);
   })
 }
}



