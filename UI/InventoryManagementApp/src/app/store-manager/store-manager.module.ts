import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';



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
