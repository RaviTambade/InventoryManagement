import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreWorkerDashboardComponent } from './store-worker-dashboard/store-worker-dashboard.component';

export const storeWorkerRoutes: Routes = [
  { path: 'dashboard', component: StoreWorkerDashboardComponent },
  { path: 'taskdetails/:taskid', component: TaskDetailsComponent },
  { path: 'taskhistory', component: TaskHistoryComponent }
]

@NgModule({
  declarations: [
    TaskDetailsComponent,
    TaskHistoryComponent,
    StoreWorkerDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class StoreWorkerModule { }
