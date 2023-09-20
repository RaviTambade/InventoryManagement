import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from 'src/app/Models/Employee';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

  storeManagerCount: number = 0;
  employees: Employee[] = [];
  data: Employee[] = [];
  storeWorkerCount: number = 0;
  department: string = 'Store';
  userIds: number[] = [];
  constructor(private _employeeSvc: EmployeeService, private _userSvc: UserService) {

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
      this.employees = res;
      this.data = res;
      this.getUser();
      this.storeManagersCount();
      this.storeWorkersCount();
    })
  }
  getUser() {
    const userIds = this.data.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    this.userIds = userIds;
    console.log(this.userIds);
    for (const userId of this.userIds) {
      this._userSvc.getUser(userId).subscribe(data => {
        for (const responseItem of data) {
          const users = this.data.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
      });
    }
    console.log(this.employees)
    console.log(this.data)
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
  }
  storeWorkers() {
    const storeWorker = this.data.filter(u => u.role === "Store Worker");
    this.employees = storeWorker;
  }


}
