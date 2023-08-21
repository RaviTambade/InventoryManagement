import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreComponent } from '../supervisor/store/store.component';

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
    CommonModule
  ],
  exports:[DashboardComponent]
})
export class StoreManagerModule { }
