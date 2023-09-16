import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

export const storeWorkerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'tasks',component:TasksComponent},
]

@NgModule({
  declarations: [
    DashboardComponent,
    TasksComponent,
    TaskHistoryComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StoreWorkerModule { }
