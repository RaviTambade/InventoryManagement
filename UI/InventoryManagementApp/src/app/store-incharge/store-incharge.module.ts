import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreInchargeDashboardComponent } from './store-incharge-dashboard/store-incharge-dashboard.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';



@NgModule({
  declarations: [
    StoreInchargeDashboardComponent,
    UpdateStaffComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StoreInchargeModule { }
