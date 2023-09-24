import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { StoreWorkerModule } from '../store-worker/store-worker.module';
import { RequestsComponent } from './requests/requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrayComponent } from './tray/tray.component';

export const supervisorRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'requests',component:RequestsComponent},
  {path:'requestshistory',component:RequestHistoryComponent},
  {path:'tray',component:TrayComponent},
  {path:'requestdetails/:requestId',component:RequestDetailsComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    RequestHistoryComponent,
    RequestsComponent,
    RequestDetailsComponent,
    TrayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[DashboardComponent]
})
export class SupervisorModule { }
