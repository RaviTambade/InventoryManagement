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

  selectedEmployeeForSwap: any = null; 
  departments:Department[]=[];
  userIds:any[]=[];
  user:User[]=[];
  data:Department[]=[];
  role:string='Supervisor';
  employees:string[]=[];
  emp:string[]=[];
  supervisors:Employee[]=[];
  supervisorIds:any[]=[];
  selectedDepartment:string[]=[];

  constructor(private svc:ProductionService,private _userService:UserService,private empSvc:EmployeeService){}
  ngOnInit(): void {
    this.svc.getAll().subscribe((res)=>{
      this.departments =res;
      this.data=res;
      this.selectedDepartment=this.data.map((u)=>u.department);
      console.log(this.data);
      console.log(this.selectedDepartment);
      // for(const department of this.departments){
      //   this.emp.push(department.firstSupervisorName);
      //   this.emp.push(department.secondSupervisorName);
      // }
      // console.log(this.departments);
      this.empSvc.getByRole(this.role).subscribe((res) => {
        this.supervisors = res;
        console.log(this.supervisors)
        this.supervisorIds= this.supervisors.map((s)=>s.userId)
           this.getUser();
      })
    })
  }

  getUser(){
    let userIdsString = this.supervisorIds.join(",");
    this._userService.getUserName(userIdsString).subscribe((res) => {
      this.user = res;
      this.supervisors.forEach((department) => {
        let matchingName = this.user.find((element) => element.id == department.userId);
        if (matchingName  != undefined) {
          department.name = matchingName.name;
        } 
      })
      this.mapData(this.supervisors,this.data);  
    })   
  }

  mapData(supervisors: Employee[], data: Department[])  {
    for (const employee of supervisors) {
        const matchingName1 = data.find((u) => employee.userId === u.firstSupervisor);
        const matchingName2 = data.find((u) => employee.userId === u.secondSupervisor);
        if (matchingName1!=undefined) {
          matchingName1.firstSupervisorName = employee.name;
        } 
        else if(matchingName2!=undefined) {
          matchingName2.secondSupervisorName = employee.name;
        } 
        else {
          this.employees.push(employee.name);    
        }
      }
      console.log(this.employees);
    }


    onSelectedEmployeeForSwap(employee: any) {
      employee.modified=true;
      if (this.selectedEmployeeForSwap === null) {
        this.selectedEmployeeForSwap = employee;
        // this.swap = true;
        // this.selectSwap = false;
        console.log(this.selectedEmployeeForSwap);
      } else {
        this.swapEmployees(this.selectedEmployeeForSwap, employee);
        this.selectedEmployeeForSwap = null;
        // this.swap = false;
        // this.selectSwap = true;
      }
    }

    swapEmployees(employee1: any, employee2: any) {

      const tempName = employee1.name;
      employee1.name = employee2.name;
      employee2.name = tempName;
  
      const tempEmployeeId = employee1.employeeId;
      employee1.employeeId = employee2.employeeId;
      employee2.employeeId = tempEmployeeId;
  
      employee1.modified = true;
      employee2.modified = true;
    }


  // dataBinding(){
  //   this.supervisors.forEach((i)=>{
  //     let matchingName1 = this.departments.find((element) => element.firstSupervisor == i.userId); 
  //     let matchingName2 = this.departments.find((element) => element.secondSupervisor == i.userId);
  //     if (matchingName1!=undefined) {
  //      matchingName1.firstSupervisorName= i.name;
  //     }
  //     else {
  //       this.employees.push(i.name);
  //     }
  //     if (matchingName2!=undefined) {
  //      matchingName2.secondSupervisorName= i.name ;
  //     }
  //     else{
  //       this.employees.push(i.name);
  //     }
  //   })
  //   console.log(this.departments);
  //   console.log(this.employees);
  // }

  onSelectedDepartment(department:string){
   console.log(department);
   const section = this.data.find(m => m.department === department)
    console.log(section);
    // this.departments = section;
  }
}
  