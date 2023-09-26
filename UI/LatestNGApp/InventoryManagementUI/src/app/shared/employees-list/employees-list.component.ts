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
  employees: any[] = [];
  userId:number[]=[];
  data: any[] = [];
  storeWorkerCount: number = 0;
  department: string = '';
  userIds:number[] = [];
  empName:string[]=[];
 

  constructor(private _employeeSvc: EmployeeService, private _userSvc: UserService, private router:Router) {

    const role=localStorage.getItem("role");
    if(role=="Supervisor Incharge"){
      this.department="Supervisor";
     
    }
    if(role=="Store Incharge"){
      this.department="Store";
      
    }
  }
  ngOnInit(): void {
    this.getEmployees();
  }
  selectEmployee(id: number) {
    this._employeeSvc.setSelectedEmployeeId(id);
  }

  getEmployees() {
    this._employeeSvc.getEmployeesByDepartment(this.department).subscribe((res) => {
      console.log(res);
      this.employees=res;
      let userIdsString = res.join(",");
      this._userSvc.getUser(userIdsString).subscribe((res)=>{
        console.log(res)
        this.employees=res;
        console.log(this.employees)
      })
      this.data = res;
      console.log(this.data);
      this.getUser();
      this.storeManagersCount();
      this.storeWorkersCount();
    })
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

  getUser() {
    // this.userIds = this.data;
    // map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    // this.userIds = userIds;
    // console.log(this.userIds );
    for (const userId of this.employees) {
      console.log(userId);
      this._userSvc.getUser(userId).subscribe(data => {
        for (const responseItem of data) {
          const users = this.data.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
      });
    }
  }
  
  storeManagersCount() {
    const storeManager = this.data.filter(u => u.role === "Store Manager").length;
    this.storeManagerCount = storeManager;
  }
  storeWorkersCount() {
    const storeWorker = this.data.filter(u => u.role === "Store Worker").length;
    this.storeWorkerCount = storeWorker;
  }
  storeManagers() {
    const storeManager = this.data.filter(u => u.role === "Store Manager");
    this.employees = storeManager;
    this._employeeSvc.setSelectedEmployeeId(0);
  }
  storeWorkers() {
    const storeWorker = this.data.filter(u => u.role === "Store Worker");
    this.employees = storeWorker;
    this._employeeSvc.setSelectedEmployeeId(0);
  }

  addNewEmployee(){
    this.router.navigate(["storeincharge/addEmployee"])
    // this.router.navigate(["storeincharge/addMaterial"])

  }
}
