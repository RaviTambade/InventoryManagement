import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { RequestsComponent } from './requests/requests.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

export const supervisorRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  
import { RouterModule, Routes } from '@angular/router';

export const supervisorRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'store',component:StoreComponent},
  {path:'requesthistory',component:RequestHistoryComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    RequestsComponent,
    RequestHistoryComponent,
    RequestDetailsComponent
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
