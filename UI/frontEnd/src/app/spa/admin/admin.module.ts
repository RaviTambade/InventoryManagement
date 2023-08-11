import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsertEmployeesModule } from './insert-employees/insert-employees.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    InsertEmployeesModule
  ]
})
export class AdminModule { }
