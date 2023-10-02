import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments/departments.component';
import { StoreComponent } from './store/store.component';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

export const sharedRoutes:Routes=[
  {path:'profile',component:ProfileComponent},
  {path:'store',component:StoreComponent},
  {path:'departments',component:DepartmentsComponent},
  {path:'employees',component:EmployeesComponent},


]

@NgModule({
  declarations: [
    ProfileComponent,
    DepartmentsComponent,
    StoreComponent,
    MaterialsComponent,
    MaterialDetailsComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
