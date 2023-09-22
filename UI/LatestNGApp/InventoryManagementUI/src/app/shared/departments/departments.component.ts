import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { warehouseStaff } from 'src/app/Models/warehouseStaff';
import { UserService } from 'src/app/Services/user.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  selectedEmployeeForSwap: any = null; // Store the selected employee
  swap: boolean = false;
  selectSwap: boolean = true;
  employees:User[]=[]
  unassignedEmpids: number[] = [];
  storeManagersids: number[] = [];
  assignedEmpIds:number[]=[];
  warehouses: warehouseStaff[] = []
  data: warehouseStaff[] = []
  users: any[] = [];
  sections:string[]=[];
  selectedSection:string='';
  constructor(private svc: WarehouseService, private _usrSvc: UserService) {
  }
  ngOnInit(): void {
    this.svc.getAllWarehouseStaff().subscribe((res) => {
      console.log(res);
      this.warehouses = res;
      this.data=res;
      console.log(this.warehouses);
      this.warehouses.forEach(item => {
          this.sections.push(item.section);
        this.assignedEmpIds.push(item.employeeId);
      });
      console.log(this.assignedEmpIds)
    })
    this.svc.getAllStoreMangers().subscribe((res) => {
      this.storeManagersids = res;
      console.log(this.storeManagersids);
      this.unassignedEmpids = this.storeManagersids.filter(id => !this.assignedEmpIds.includes(id));
      console.log(this.unassignedEmpids);
        // this.getUnassignedUser(this.unassignedEmpids)
        this.getUser(this.storeManagersids);

    })

  }
  onSelectedSection() {
    console.log(this.selectedSection);
    const section = this.data.filter(m => m.section === this.selectedSection)
    console.log(section);
    this.warehouses = section;
    console.log(this.warehouses)
  }

  // getUser(ids: any) {
  //   this.usrsvc.get(ids).subscribe((res) => {
  //     console.log(res);
  //     this.users = res;
  //     if (this.users.length != 0) {
  //       for (const user of this.users) {
  //         const matchingWarehouseStaff = this.warehouses.find(staff => staff.employeeId === user.id);
  //         if (matchingWarehouseStaff) {
  //           matchingWarehouseStaff.name = user.name;
  //         }
  //       }
  //       this.getUnassignedEmployees();
  //     }
  //   })

  //   console.log(this.warehouses)
  // }
  getUser(ids:any) {
    const userIds = this.data.map(item => item.employeeId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    
    for (const userId of ids) {
      this._usrSvc.getUser(userId).subscribe(data => {
        for (const responseItem of data) {
          const users = this.data.filter(u => u.employeeId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
      });
    }
  }
  getUnassignedUser(ids:any) {
    
    for (const userId of ids) {
      this._usrSvc.getUser(userId).subscribe(data => {
       this.employees.push(data);
      });
    }
    console.log(this.employees)
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


  // replaceEmployee(warehouse: any, selectedEmployee: any) {
  //   warehouse.modified=true;
  // const originalData=  { name: warehouse.name, employeeId: warehouse.id }
  // warehouse.name = selectedEmployee.name;
  // warehouse.employeeId=selectedEmployee.employeeId;
  // const employeeIndex = this.employees.indexOf(selectedEmployee);
  
  // if (employeeIndex !== -1) {
  //   this.employees[employeeIndex] = originalData;
  // }
  //     console.log(this.warehouses)
  //   console.log(this.employees)

  // }

  onUpdate(){
    const modifiedData = this.warehouses.filter(item => item.modified);
    console.log('Modified objects:', modifiedData);
    this.svc.updateWarehouseStaff(modifiedData).subscribe((res)=>{
      console.log(res);
    })
  }
}

