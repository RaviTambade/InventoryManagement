import { Component } from '@angular/core';
import { UserDetails } from 'src/app/Models/UserDetails';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  userDetails:UserDetails|undefined;
  update:boolean=false;
  constructor(private _employeeSvc:EmployeeService,private _userSvc:UserService){

  }
  ngOnInit(): void {
    this._employeeSvc.selectedEmployeeId$.subscribe((id) => {
      console.log(id)
      const employeeId=id;
      if(id==0 || id==null){
        this.userDetails=undefined;
        // this.newDetails=false;
      }
      else
    this.getUserDetails(employeeId);

  }) 
  }
  getUserDetails(employeeId:any){
    this._userSvc.getUserDetails(employeeId).subscribe((res)=>{
      console.log(res);
      this.userDetails=res;
    })
  }

  updateEmployee(){
    this.update=true;
  }

}
