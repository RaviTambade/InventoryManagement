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
  update:boolean=false;
   userDetails:UserDetails | undefined;
   employeeId:number=0;
  constructor(private _employeeSvc:EmployeeService,private _userSvc:UserService){

  }
  ngOnInit(): void {
    this._employeeSvc.selectedEmployeeId$.subscribe((id) => {
      console.log(id)
      this.employeeId=id;
      if(id==0 || id==null){
        // this.newDetails=false;
      }
      else
    this.getUserDetails(this.employeeId);

  }) 
  }
  getUserDetails(employeeId:any){
    this._userSvc.getUserDetails(employeeId).subscribe((res)=>{
      console.log(res);
      this.userDetails=res;
    })
  }

  onUpdate(){
    this.update=true;
  }
  updateEmployee(){
    console.log(this.userDetails)
    if(this.userDetails)
    this._userSvc.updateUser(this.employeeId,this.userDetails).subscribe((res)=>{
      console.log(res);
    })
  }

}
