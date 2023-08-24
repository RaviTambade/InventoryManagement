import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Employee } from 'src/app/Employee';
import { WarehouseService } from 'src/app/warehouse.service';
import { sv } from 'date-fns/locale';
import { warehouseStaff } from 'src/app/WarehouseStaff';

@Component({
  selector: 'switch-department',
  templateUrl: './switch-department.component.html',
  styleUrls: ['./switch-department.component.css']
})
export class SwitchDepartmentComponent {
  // sections = [
  //     { id: 1, employee: 'Employee 1' },
  //     { id: 2, employee: 'Employee 2' },
  //     { id: 3, employee: 'Employee 3' },
  //   // Add more sections as needed
  // ];
   employees = ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', /* Add more employees */];
  selectedSection: any = null;
  selectedEmployee: string = '';
  showModal = false;
  warehouses:warehouseStaff[]=[]
  warehouse:boolean=false;
  constructor(private svc:WarehouseService){
  }
  ngOnInit():void{
    this.svc.getAllStoreMangers().subscribe((res)=>{
      console.log(res);
    })
    this.svc.getAllWarehouseStaff().subscribe((res)=>{
      console.log(res);
      this.warehouses=res;
      console.log(this.warehouses);
    
    })

  }
  openChangeEmployeeModal(section: any) {
    this.selectedSection = section;
    this.selectedEmployee = '';
    this.showModal = true;
  }

  closeChangeEmployeeModal() {
    this.selectedSection = null;
    this.selectedEmployee = '';
    this.showModal = false;
  }

  assignEmployeeToSection() {
    if (this.selectedSection && this.selectedEmployee) {
      this.selectedSection.employee = this.selectedEmployee;
      this.closeChangeEmployeeModal();
    }
  }
}
