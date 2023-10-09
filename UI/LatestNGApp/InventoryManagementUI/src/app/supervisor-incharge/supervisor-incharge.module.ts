import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';

export const supervisorInchargeRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'department',component:DepartmentsComponent},
]

@NgModule({
  declarations: [
    DashboardComponent,
    DepartmentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SupervisorInchargeModule { }
