import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/Order';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orders: any[];
  employeeids: any[];
  locations: any[];
  orderDetails:any[];
  public constructor(private svc: OrderService, private appsvc: AppService, private router: Router) {
    this.orders = [];
    this.employeeids = [];
    this.locations = [];
    this.orderDetails=[];
  }
  ngOnInit() {
    this.svc.orderHistory(1).subscribe((res) => {
      console.log(res);
      this.orders = res;
      console.log(this.orders);
    })
  }
 

  onView(orderId: number) {
    this.router.navigate(['orderdetails', orderId]);

  }
}
