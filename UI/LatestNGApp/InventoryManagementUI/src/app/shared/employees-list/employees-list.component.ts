import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from 'src/app/Models/Employee';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

  storeManagerCount: number = 0;
  employees: Employee[] = [];
  userId: number[] = [];
  data: any[] = [];
  storeWorkerCount: number = 0;
  department: string = '';
  userIds: number[] = [];
  employee: any[] = [];
  user: User[] = [];
  role: string = " ";
  isRole: boolean = false;
  supervisorCount: number = 0;

  constructor(private _employeeSvc: EmployeeService, private _userSvc: UserService, private router: Router) {
    const role = localStorage.getItem("role");
    if (role == "Supervisor Incharge") {
      this.department = "Production";
    }
    else {
      this.department = "Store";
      this.isRole = true;
    }
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  selectEmployee(id: number) {
    this._employeeSvc.setSelectedEmployeeId(id);
  }

  getEmployees() {
    if (this.department) {
      this._employeeSvc.getEmployeesByDepartment(this.department).subscribe((res) => {
        console.log(res);
        this.employees = res;
        this.data = res;

        let userIds = this.employees.map(e => e.userId)
        let userIdsString = userIds.join(",");

        this._userSvc.getUserName(userIdsString).subscribe((res) => {
          console.log(res)
          this.user = res;
          console.log(this.data);
          this.data.forEach((employee) => {
            let matchingName = this.user.find((element) => element.id == employee.userId)
            console.log(matchingName);
            if (matchingName != undefined) {
              employee.name = matchingName.name
            }
          })
        })
        this.getCount();
        this.storeManagers()
      })
    }

    // if(role=="Store Incharge"){
    //   this.department="Store";
    //   this._employeeSvc.getEmployeesByDepartment(this.department).subscribe((res) => {
    //     console.log(res);
    //     this.employees=res;
    //     const id=this.employees[0].userId;
    //     this._employeeSvc.setSelectedEmployeeId(id);
    //     this.employee=res;
    //     let userIds=this.employees.map(e=>e.userId)  
    //     let userIdsString = userIds.join(",");
    //     this._userSvc.getUserName(userIdsString).subscribe((res)=>{
    //     console.log(res)
    //     this.data=res;
    //     console.log(this.employees)
    //     this.employees.forEach((employee)=>{
    //     let matchingName=this.data.find((element)=>element.id==employee.userId)
    //     console.log(matchingName);
    //     if(matchingName != undefined){
    //       employee.name=matchingName.name
    //     }
    //     })


    //   })
    //     console.log(this.data);
    //     this.getCount();
    //   })
    // }   
  }

  getCount() {
    this.storeManagerCount = this.data.filter(u => u.role === "Store Manager").length;
    this.storeWorkerCount = this.data.filter(u => u.role === "Store Worker").length;
    this.supervisorCount = this.data.filter(u => u.role === "Supervisor").length;
  }



  supervisors() {
    const supervisor = this.data.filter(u => u.role === "Supervisor");
    console.log(supervisor);
    this.employees = supervisor;
    console.log(this.employees);
    const id = this.employees[0].userId;
    this._employeeSvc.setSelectedEmployeeId(id);
  }

  storeManagers() {

    const storeManager = this.data.filter(u => u.role === "Store Manager");
    console.log(storeManager);
    this.employees = storeManager;
    console.log(this.employees);
    const id = this.employees[0].userId;
    this._employeeSvc.setSelectedEmployeeId(id);
  }
  storeWorkers() {

    const storeWorker = this.data.filter(u => u.role === "Store Worker");
    this.employees = storeWorker;
    console.log(this.employees);
    const id = this.employees[0].userId;
    this._employeeSvc.setSelectedEmployeeId(id);
  }

  addNewEmployee() {
    this.router.navigate(["storeincharge/addEmployee"])

  }
}
