import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailsComponent,
    
  ],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
