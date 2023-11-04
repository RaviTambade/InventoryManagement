import { Component } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { User } from 'src/app/Models/User';
import { UpdateWarehouse } from 'src/app/Models/updateWarehouse';
import { warehouseStaff } from 'src/app/Models/warehouseStaff';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  selectedEmployeeForSwap: any = null; 
  swap: boolean = false;
  selectSwap: boolean = true;
  employees:any[]=[];
  storeManagersids: number[] = [];
  warehouses: warehouseStaff[] = [];
  warehouseStaff:warehouseStaff| undefined;
  role:string="Store Manager"
  data: warehouseStaff[] = [];
  sections:string[]=[];
  selectedSection:string='';
  storeManagers:Employee[]=[];
  updateWarehouse:any={
    id: 0,
    employeeId: 0,
  }
  constructor(private svc: WarehouseService, private _usrSvc: UserService,private empSvc:EmployeeService) {
  }

  ngOnInit(): void {
    this.svc.getAllWarehouseStaff().subscribe((res) => {
      this.warehouses=res;
      this.data=res;
      this.sections= this.data.map((w) => w.section);
    })
    this.empSvc.getByRole(this.role).subscribe((res) => {
      this.storeManagers = res;
      this.storeManagersids= this.storeManagers.map((s)=>s.userId)
      let userIdsString = this.storeManagersids.join(","); 
        //  this.getUser(this.storeManagersids);
        this._usrSvc.getUserName(userIdsString).subscribe(data => {
        for (const responseItem of data) {
          const users = this.storeManagers.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
        // this.mapData(this.storeManagers,this.data);
        for (const employee of this.storeManagers) {
          const matchingWarehouseStaff = this.data.find((warehouseStaff) => employee.userId === warehouseStaff.employeeId);

          if (matchingWarehouseStaff) {
              matchingWarehouseStaff.name = employee.name;
          } else {
              this.employees.push(employee.name);
          }
        }
      });
    })
  }

    onReplaceEmployee(warehouse: any, selectedEmployee: any) {
    warehouse.modified=true; 
    const originalData=  { name: warehouse.name, employeeId: warehouse.employeeId }
    warehouse.name = selectedEmployee.name;
    warehouse.employeeId=selectedEmployee.userId;
    const employeeIndex = this.employees.indexOf(selectedEmployee);
    if (employeeIndex !== -1) {
      this.employees[employeeIndex] = originalData;
    }
    }

    
    onUpdateEmployee(){
      const modifiedData = this.data.filter(item => item.modified);
      modifiedData.forEach(element => {
        this.updateWarehouse.id = element.id,
        this.updateWarehouse.employeeId = element.employeeId
          this.svc.updateWarehouseStaff(this.updateWarehouse).subscribe((res)=>{
          })
      });
    }
  
  onSelectedEmployeeForSwap(employee: any) {
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

  onSelectedSection(data:string) {
    console.log(data);
    const section = this.data.find(m => m.section === data)
    console.log(section);
    this.warehouseStaff = section;
  }
}

