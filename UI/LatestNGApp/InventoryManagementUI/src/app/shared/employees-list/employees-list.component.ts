import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from 'src/app/Models/Employee';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

  storeManagerCount: number = 0;
  employees: Employee[] = [];
  userId:number[]=[];
  data: any[] = [];
  storeWorkerCount: number = 0;
  department: string = '';
  userIds:number[] = [];
  employee:any[]=[];
  role:string="Supervisor";
  isRole:boolean=false;
  supervisorCount:number=0;
 
  constructor(private _employeeSvc: EmployeeService, private _userSvc: UserService, private router:Router) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  selectEmployee(id: number) {
    this._employeeSvc.setSelectedEmployeeId(id);
  }

  getEmployees() {
    const role=localStorage.getItem("role");
    if(role=="Supervisor Incharge"){
      console.log(role);
      this.department="Supervisor"; 
      this._employeeSvc.getByRole(this.role).subscribe((res)=>{
        console.log(res);
        this.employees=res
        this.employee=res;
        this.isRole=true;
        console.log(this.employee);
        let userIds=this.employees.map(e=>e.userId)  
        let userIdsString = userIds.join(",");
        this._userSvc.getUserName(userIdsString).subscribe((res)=>{
        console.log(res)
        this.data=res;
        console.log(this.employees)
        this.employees.forEach((employee)=>{
        let matchingName=this.data.find((element)=>element.id==employee.userId)
        console.log(matchingName);
        if(matchingName != undefined){
          employee.name=matchingName.name
        }
        })
      })
      this.supervisorsCount();
      })
    }

    if(role=="Store Incharge"){
      this.department="Store";
      this._employeeSvc.getEmployeesByDepartment(this.department).subscribe((res) => {
        console.log(res);
        this.employees=res;
        this.employee=res;
        let userIds=this.employees.map(e=>e.userId)  
        let userIdsString = userIds.join(",");
        this._userSvc.getUserName(userIdsString).subscribe((res)=>{
        console.log(res)
        this.data=res;
        console.log(this.employees)
        this.employees.forEach((employee)=>{
        let matchingName=this.data.find((element)=>element.id==employee.userId)
        console.log(matchingName);
        if(matchingName != undefined){
          employee.name=matchingName.name
        }
        })
      })
        console.log(this.data);
        this.storeManagersCount();
        this.storeWorkersCount();       
      })
    }   
  }
  // async getUser() {
  //   const userIds = this.data.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
  //   this.userIds = userIds;
  //   console.log(this.userIds);
  
  //   for (const userId of this.userIds) {
  //     try {
  //       const data = await this._userSvc.getUser(userId).toPromise(); // Convert Observable to Promise
  
  //       for (const responseItem of data) {
  //         const users = this.data.filter(u => u.userId === responseItem.id);
  //         for (const user of users) {
  //           user.name = responseItem.name;
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }
  
  //   console.log(this.employees);
  //   console.log(this.data);
  // }


  supervisorsCount() {
    const supervisors = this.employee.filter(u => u.role === "Supervisor").length;
    console.log(supervisors);
    this.supervisorCount = supervisors;
  }
  
  storeManagersCount() {
    const storeManager = this.employee.filter(u => u.role === "Store Manager").length;
    this.storeManagerCount = storeManager;
  }

  storeWorkersCount() {
    const storeWorker = this.employee.filter(u => u.role === "Store Worker").length;
    this.storeWorkerCount = storeWorker;
  }

  supervisors(){
    const supervisor = this.employee.filter(u => u.role === "Supervisor");
    console.log(supervisor);
    this.employees = supervisor;
    console.log(this.employees);
    this._employeeSvc.setSelectedEmployeeId(0);
  }

  storeManagers() {
    const storeManager = this.employee.filter(u => u.role === "Store Manager");
    console.log(storeManager);
    this.employees = storeManager;
    console.log(this.employees);
    this._employeeSvc.setSelectedEmployeeId(0);
  }
  storeWorkers() {
    const storeWorker = this.employee.filter(u => u.role === "Store Worker");
    this.employees = storeWorker;
    console.log(this.employees);
    this._employeeSvc.setSelectedEmployeeId(0);
  }

  addNewEmployee(){
    this.router.navigate(["storeincharge/addEmployee"])
    // this.router.navigate(["storeincharge/addMaterial"])

  }
}
