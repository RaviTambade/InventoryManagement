import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { Routes } from '@angular/router';

export const storeWorkerRoutes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'orderdetails/:requestid', component: OrderDetailsComponent },
  { path: 'orderhistory', component: OrdersHistoryComponent }
]


@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrdersHistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StoreManagerModule { }
