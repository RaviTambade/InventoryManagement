import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddMaterialComponent } from './add-material/add-material.component';

export const storeInchargeRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'addEmployee',component:AddEmployeeComponent},
  {path:'addMaterial',component:AddMaterialComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    AddEmployeeComponent,
    AddMaterialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreInchargeModule { }
