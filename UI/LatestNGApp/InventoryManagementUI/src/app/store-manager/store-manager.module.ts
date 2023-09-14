import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';

export const storeManagerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'order',component:OrderComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    OrderComponent,
    OrderDetailsComponent,
    OrderhistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StoreManagerModule { }
