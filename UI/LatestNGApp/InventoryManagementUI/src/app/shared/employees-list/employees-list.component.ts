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
  role:string="Supervisor";
  isRole:boolean=false;
 
  constructor(private _employeeSvc: EmployeeService, private _userSvc: UserService, private router:Router) {

    // const role=localStorage.getItem("role");
    // if(role=="Supervisor Incharge"){
    //   console.log(role);
    //   this.department="Supervisor"; 
    // }
    // if(role=="Store Incharge"){
    //   this.department="Store";
        
    // }
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
        this.employees=res;
        this.data=res;
        this.getUser();
      //   let userIdsString = res.join(",");
      //   this._userSvc.getUser(userIdsString).subscribe((res)=>{
      //   console.log(res)
      //   this.employees=res;
      //   console.log(this.employees)
      // })
      })
    }
    if(role=="Store Incharge"){
      this.department="Store";
      this._employeeSvc.getEmployeesByDepartment(this.department).subscribe((res) => {
        console.log(res);
        this.employees=res;
        this.data=res;
        this.getUser();
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

  getUser() {
    const userIds = this.data.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    this.userIds = userIds;
    console.log(this.userIds );
    for (const userId of this.userIds) {
      console.log(userId);
      this._userSvc.getUser(userId).subscribe(data => {
        console.log(data);
        for (const responseItem of data) {
          console.log(responseItem);
          const users = this.data.filter(u => u.userId === responseItem.id);
          console.log(users);
          for (const user of users) {
            console.log(user);
            user.name = responseItem.name;
            console.log(user.name);
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
