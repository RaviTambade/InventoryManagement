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
        this.employees = res;
        this.data = res;

        let userIds = this.employees.map(e => e.userId)
        let userIdsString = userIds.join(",");

        this._userSvc.getUserName(userIdsString).subscribe((res) => {
          this.user = res;
          this.data.forEach((employee) => {
            let matchingName = this.user.find((element) => element.id == employee.userId)
            if (matchingName != undefined) {
              employee.name = matchingName.name
            }
          })
        })
        this.getCount();
        // if(this.department = "Production" ){
        //   console.log("supervisor")
        //   this.supervisors();
        // }else
        // console.log("store m")

        this.storeManagers();
      })
    }


  }

  getCount() {
    this.storeManagerCount = this.data.filter(u => u.role === "Store Manager").length;
    this.storeWorkerCount = this.data.filter(u => u.role === "Store Worker").length;
    this.supervisorCount = this.data.filter(u => u.role === "Supervisor").length;
  }



  supervisors() {
    const supervisor = this.data.filter(u => u.role === "Supervisor");
    this.employees = supervisor;
    const id = this.employees[0].userId;
    this._employeeSvc.setSelectedEmployeeId(id);
  }

  storeManagers() {
    const storeManager = this.data.filter(u => u.role === "Store Manager");
    this.employees = storeManager;
    const id = this.employees[0].userId;
    this._employeeSvc.setSelectedEmployeeId(id);
  }
  storeWorkers() {
    const storeWorker = this.data.filter(u => u.role === "Store Worker");
    this.employees = storeWorker;
    const id = this.employees[0].userId;
    this._employeeSvc.setSelectedEmployeeId(id);
  }

  addNewEmployee() {
    this.router.navigate(["storeincharge/addEmployee"])

  }
}
