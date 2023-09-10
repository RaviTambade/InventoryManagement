import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { StoreWorkerModule } from '../store-worker/store-worker.module';
import { RequestsComponent } from './requests/requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { FormsModule } from '@angular/forms';

export const supervisorRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'store',component:StoreComponent},
  {path:'requests',component:RequestsComponent},
  {path:'requestshistory',component:RequestHistoryComponent},
  {path:'requestdetails/:requestId',component:RequestDetailsComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    StoreComponent,
    RequestHistoryComponent,
    RequestsComponent,
    RequestDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[DashboardComponent]
})
export class SupervisorModule { }
