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
     "birthdate": '',
     "hiredate":new Date(),
     "contactNumber":'',
     "email":'',
     "password":'',
     "imgUrl":'',
     "gender":'',
     "department":'',
     "role":''
  };
  status: boolean | undefined;

  constructor(private svc:EmployeeServiceService) { }

 

  Register(_RegisterForm:any){
    console.log("emp" + this.employee);
    this.svc.insertEmployee(this.employee).subscribe((Response)=>{
      this.status=Response;
      console.log(Response);
    })
  }
}
