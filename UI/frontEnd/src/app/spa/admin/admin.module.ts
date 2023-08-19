import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertEmployeesModule } from './insert-employees/insert-employees.module';
import { SwitchDepartmentComponent } from './switch-department/switch-department.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';



@NgModule({
  declarations: [
  
    SwitchDepartmentComponent,
       UpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InsertEmployeesModule,
    ReactiveFormsModule
  ],
  exports:[SwitchDepartmentComponent,UpdateEmployeeComponent]
})
export class AdminModule { }
