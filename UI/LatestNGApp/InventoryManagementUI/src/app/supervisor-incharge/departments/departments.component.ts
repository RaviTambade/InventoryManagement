import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/Models/Department';
import { Employee } from 'src/app/Models/Employee';
import { User } from 'src/app/Models/User';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ProductionService } from 'src/app/Services/production.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit{

  departments:Department[]=[];
  userIds:any[]=[];
  user:User[]=[];
  data:Department[]=[];
  role:string='Supervisor';
  employees:string[]=[];
  supervisors:Employee[]=[];
  supervisorIds:any[]=[];

  constructor(private svc:ProductionService,private _userService:UserService,private empSvc:EmployeeService){}
  ngOnInit(): void {
    this.svc.getAll().subscribe((res)=>{
      this.departments =res;
      this.data=res;
      console.log(res);
      // for(const department of this.departments){
      //   this.userIds.push(department.firstSupervisor);
      //   this.userIds.push(department.secondSupervisor);
      // }
      this.empSvc.getByRole(this.role).subscribe((res) => {
        this.supervisors = res;
        console.log(this.supervisors);
        this.supervisorIds= this.supervisors.map((s)=>s.userId)
        console.log(this.supervisors);
        console.log(this.supervisorIds); 
           this.getUser();
      })
    })
  }

  getUser(){
    let userIdsString = this.supervisorIds.join(",");
    console.log(userIdsString);
    this._userService.getUserName(userIdsString).subscribe((res) => {
      console.log(res)
      this.user = res;
      console.log(this.user);
      this.supervisors.forEach((department) => {
        let matchingName = this.user.find((element) => element.id == department.userId);
        console.log(matchingName);
        if (matchingName  != undefined) {
          department.name = matchingName.name;
        }
        console.log(this.supervisors);
        // this.mapData(this.supervisors,this.data);
         
      })
      this.dataBinding();  
    }) 
    console.log(this.departments);
    // console.log(this.data);
    // console.log(this.employees);
    
  }


  dataBinding(){
    this.supervisors.forEach((i)=>{
      let matchingName1 = this.departments.find((element) => element.firstSupervisor == i.userId); 
      let matchingName2 = this.departments.find((element) => element.secondSupervisor == i.userId);
      if (matchingName1  != undefined) {
       matchingName1.firstSupervisorName= i.name;
      }
      else{
        this.employees.push();
      }
      if (matchingName2  != undefined) {
       matchingName2.secondSupervisorName= i.name ;
      }
      else{
        this.employees.push();
      }
    })
    console.log(this.departments);
    console.log(this.employees);
  }
}
  