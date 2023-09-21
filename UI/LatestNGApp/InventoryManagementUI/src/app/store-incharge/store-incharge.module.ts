import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProfessionalDetailsComponent } from './professional-details/professional-details.component';
import { AddMaterialComponent } from './add-material/add-material.component';

export const storeInchargeRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'addEmployee',component:AddEmployeeComponent},
  {path:'addMaterial',component:AddMaterialComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    PersonalDetailsComponent,
    ProfessionalDetailsComponent,
    AddMaterialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreInchargeModule { }
