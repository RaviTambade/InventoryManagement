import { Component, OnInit } from '@angular/core';
import { Order } from 'app/order/Order';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  orderId:number=3;
  orders:Order[] |undefined;
  constructor(private svc:EmployeeServiceService, private router:Router){}
  
  ngOnInit(): void {
    
    this.getOrderhistory(this.orderId);
  }

  getOrderhistory(orderId:number){
    this.svc.getOrders(orderId).subscribe((response)=>
    {
        this.orders=response;
        console.log(this.orders)
        console.log(response);
    })
  }

}
