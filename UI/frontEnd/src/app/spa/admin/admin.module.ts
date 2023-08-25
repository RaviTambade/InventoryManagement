import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwitchDepartmentComponent } from './switch-department/switch-department.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { Routes } from '@angular/router';
import { InsertEmployeeComponent } from './insert-employee/insert-employee.component';
import { UpdateManterialsComponent } from './update-manterials/update-manterials.component';



@NgModule({
  declarations: [
  
    SwitchDepartmentComponent,
       UpdateEmployeeComponent,
       InsertEmployeeComponent,
       UpdateManterialsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  exports:[SwitchDepartmentComponent,UpdateEmployeeComponent,InsertEmployeeComponent,UpdateManterialsComponent]
})
export class AdminModule { }
