import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertEmployeesModule } from './insert-employees/insert-employees.module';
import { SwitchDepartmentComponent } from './switch-department/switch-department.component';



@NgModule({
  declarations: [
  
    SwitchDepartmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InsertEmployeesModule,
    ReactiveFormsModule
  ],
  exports:[SwitchDepartmentComponent]
})
export class AdminModule { }
