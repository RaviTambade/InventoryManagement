import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { StoreWorkerModule } from '../store-worker/store-worker.module';

export const supervisorRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'store',component:StoreComponent},
  {path:'requesthistory',component:RequestHistoryComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    StoreComponent,
    RequestHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[DashboardComponent]
})
export class SupervisorModule { }
