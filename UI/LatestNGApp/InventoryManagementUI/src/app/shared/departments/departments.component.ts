import { Component } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { User } from 'src/app/Models/User';
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
  warehouses: warehouseStaff[] = []
  role:string="Store Manager"
  data: warehouseStaff[] = []
  users: any[] = [];
  sections:string[]=[];
  selectedSection:string='';
  storeManagers:Employee[]=[];
  constructor(private svc: WarehouseService, private _usrSvc: UserService,private empSvc:EmployeeService) {
  }
  ngOnInit(): void {
    this.svc.getAllWarehouseStaff().subscribe((res) => {
      console.log(res);
      this.warehouses=res;
      this.data=res;
      this.sections= this.warehouses.map((w) => w.section);
      console.log(this.sections)
    })
    this.empSvc.getByRole(this.role).subscribe((res) => {
      this.storeManagers = res;
      this.storeManagersids= this.storeManagers.map((s)=>s.userId)
      console.log(this.storeManagers);
      console.log(this.storeManagersids); 
         this.getUser(this.storeManagersids);
    })
  }

  getUser(ids:any) {   
      this._usrSvc.getUser(ids).subscribe(data => {
        console.log(data);
        for (const responseItem of data) {
          const users = this.storeManagers.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
        this.mapData(this.storeManagers,this.data);
      });
     
    console.log(this.storeManagers);
    console.log(this.data)
    console.log(this.employees)
  }

  mapData(storeManagers: Employee[], warehouseStaffs: warehouseStaff[])  {

        for (const employee of storeManagers) {
            const matchingWarehouseStaff = warehouseStaffs.find((warehouseStaff) => employee.userId === warehouseStaff.employeeId);

            if (matchingWarehouseStaff) {
                matchingWarehouseStaff.name = employee.name;
            } else {
                this.employees.push(employee);
                
            }
        }
        console.log('All Data:', this.storeManagers);
        console.log('Matched Data:', this.warehouses);
        console.log('Emp:', this.employees);
        
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

  

  onUpdate(){
    const modifiedData = this.warehouses.filter(item => item.modified);
    console.log('Modified objects:', modifiedData);
    this.svc.updateWarehouseStaff(modifiedData).subscribe((res)=>{
      console.log(res);
    })
  }

  onSelectedSection() {
    console.log(this.selectedSection);
    const section = this.data.filter(m => m.section === this.selectedSection)
    console.log(section);
    this.warehouses = section;
  }
}

