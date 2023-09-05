import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreComponent } from '../supervisor/store/store.component';
import { SharedModule } from '../shared/shared.module';

export const storeManagerRoutes: Routes = [
   { path: 'dashboard', component: DashboardComponent },
  { path: 'orderdetails/:requestid', component: OrderDetailsComponent },
  { path: 'orderhistory', component: OrdersHistoryComponent },
  { path: 'store', component: StoreComponent }
]


@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrdersHistoryComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule  

  ],
  exports:[DashboardComponent]
})
export class StoreManagerModule { }
