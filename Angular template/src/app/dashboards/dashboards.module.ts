import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisorsDashboardComponent } from './supervisors-dashboard/supervisors-dashboard.component';
import { StoreManagerDashboardComponent } from './store-manager-dashboard/store-manager-dashboard.component';
import { InchargeDashboardComponent } from './incharge-dashboard/incharge-dashboard.component';
import { StoreWorkerDashboardComponent } from './store-worker-dashboard/store-worker-dashboard.component';



@NgModule({
  declarations: [
    SupervisorsDashboardComponent,
    StoreManagerDashboardComponent,
    InchargeDashboardComponent,
    StoreWorkerDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardsModule { }
