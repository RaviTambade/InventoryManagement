import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreInchargeDashboardComponent } from './store-incharge-dashboard/store-incharge-dashboard.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { UpdateMaterialComponent } from './update-material/update-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StoreInchargeDashboardComponent,
    UpdateStaffComponent,
    UpdateInventoryComponent,
    UpdateMaterialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreInchargeModule { }
