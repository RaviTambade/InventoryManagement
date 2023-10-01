import { Component } from '@angular/core';
import { warehouseStaff } from 'src/app/Models/warehouseStaff';
import { UserService } from 'src/app/Services/user.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent {
  selectedEmployeeForSwap: any = null; // Store the selected employee
  swap: boolean = false;
  selectSwap: boolean = true;
  employees:any[]=[]
  ids: number[] = [];
  warehouses: warehouseStaff[] = []
  users: any[] = [];
  constructor(private svc: WarehouseService, private usrsvc: UserService) {
  }
  ngOnInit(): void {
    this.svc.getAllWarehouseStaff().subscribe((res) => {
      console.log(res);
      this.warehouses = res;
      console.log(this.warehouses);
    })
    this.svc.getAllStoreMangers().subscribe((res) => {
      console.log(res);
      this.ids = res;
      console.log(this.ids);
      if (this.ids.length != 0) {
        this.getUser(this.ids);
      }
    })

  }

  getUser(ids: any) {
    // this.usrsvc.getallByUserIds(ids).subscribe((res) => {
    //   console.log(res);
    //   this.users = res;
    //   if (this.users.length != 0) {
    //     for (const user of this.users) {
    //       const matchingWarehouseStaff = this.warehouses.find(staff => staff.employeeId === user.id);
    //       if (matchingWarehouseStaff) {
    //         matchingWarehouseStaff.name = user.name;
    //       }
    //     }
    //     this.getUnassignedEmployees();
    //   }
    // })

    console.log(this.warehouses)
  }

  getUnassignedEmployees() {
    this.employees = this.users.filter(users => !this.warehouses.some(warehouse => warehouse.employeeId === users.id))
  .map(user => ({ name: user.name, employeeId: user.id }))
console.log(this.employees);


  }


  selectEmployeeForSwap(employee: any) {
    employee.modified=true;
    if (this.selectedEmployeeForSwap === null) {
      this.selectedEmployeeForSwap = employee;
      this.swap = true;
      this.selectSwap = false;
      console.log(this.selectedEmployeeForSwap);
    } else {
      this.swapEmployees(this.selectedEmployeeForSwap, employee);
      this.selectedEmployeeForSwap = null;
      this.swap = false;
      this.selectSwap = true;
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


  replaceEmployee(warehouse: any, selectedEmployee: any) {
    warehouse.modified=true;
  const originalData=  { name: warehouse.name, employeeId: warehouse.id }
  warehouse.name = selectedEmployee.name;
  warehouse.employeeId=selectedEmployee.employeeId;
  const employeeIndex = this.employees.indexOf(selectedEmployee);
  
  if (employeeIndex !== -1) {
    this.employees[employeeIndex] = originalData;
  }
      console.log(this.warehouses)
    console.log(this.employees)

  }

  onUpdate(){
    const modifiedData = this.warehouses.filter(item => item.modified);
    console.log('Modified objects:', modifiedData);
    // this.svc.updateWarehouseStaff(modifiedData).subscribe((res)=>{
    //   console.log(res);
    // })
  }
}
