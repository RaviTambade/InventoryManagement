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
   userDetails:UserDetails ={
     id: 0,
     aadharId: '',
     firstName: '',
     lastName: '',
     birthDate: new Date(),
     gender: '',
     email: '',
     contactNumber: '',
     imageUrl: ''
   };
   employeeId:number=0;
   details:boolean=false;
  constructor(private _employeeSvc:EmployeeService,private _userSvc:UserService){
    
  }
  ngOnInit(): void {
    this._employeeSvc.selectedEmployeeId$.subscribe((id) => {
      console.log(id)
      this.employeeId=id;
      if(id==0 || id==null){
        this.details=false;
      }
      else
    this.getUserDetails(this.employeeId);

  }) 
  }
  getUserDetails(employeeId:any){
    this.update=false;
    this._userSvc.getUserDetails(employeeId).subscribe((res)=>{
      this.userDetails=res;
      console.log(this.userDetails);
      this.details=true;
    })
  }

  onUpdate(){
    this.update=true;
  }
  updateEmployee(){
    console.log(this.userDetails)
    this.userDetails.imageUrl='';
    if(this.userDetails)
    this._userSvc.updateUser(this.employeeId,this.userDetails).subscribe((res)=>{
      console.log(res);
    })
  }

  onCancel(){
    this.update=false;
  }

  onDelete(){
    this._userSvc.deleteUser(this.userDetails.aadharId).subscribe((res)=>{
      console.log(res);
      if(res){
      this._employeeSvc.deleteEmployee(this.employeeId).subscribe((res)=>{
        console.log(res);
        })
      }
    })
  }
}
