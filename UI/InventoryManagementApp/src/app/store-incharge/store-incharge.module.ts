import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreInchargeDashboardComponent } from './store-incharge-dashboard/store-incharge-dashboard.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { UpdateMaterialComponent } from './update-material/update-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDepartmentComponent } from './store-department/store-department.component';
import { Routes } from '@angular/router';

export const storeInchargeRoutes: Routes = [
  { path: 'dashboard', component: StoreInchargeDashboardComponent },
 { path: 'storedepartment', component: StoreDepartmentComponent },
 { path: 'updateinventory', component: UpdateInventoryComponent },
 { path: 'updateMaterial', component: UpdateMaterialComponent },

]


@NgModule({
  declarations: [
    StoreInchargeDashboardComponent,
    UpdateStaffComponent,
    UpdateInventoryComponent,
    UpdateMaterialComponent,
    StoreDepartmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreInchargeModule { }
