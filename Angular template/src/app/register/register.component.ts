import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'app/employee-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

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

 

  Register(_RegisterForm:any){
    console.log("emp" + this.employee);
    this.employee.genderId = Number.parseInt( this.employee.gender);
    this.employee.roleId = Number.parseInt( this.employee.role);
    this.employee.departmentId = Number.parseInt( this.employee.department);
    this.svc.insertEmployee(this.employee).subscribe((Response)=>{
      this.status=Response;
      console.log(Response);
    })
  }
}
