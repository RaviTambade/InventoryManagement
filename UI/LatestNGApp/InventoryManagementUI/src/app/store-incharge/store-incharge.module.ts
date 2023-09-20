import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { FormsModule } from '@angular/forms';

export const storeInchargeRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'employees',component:EmployeesComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class StoreInchargeModule { }
