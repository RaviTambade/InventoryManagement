import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/Order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orders: Order[];
  employeeids: any[];
  locations: any[];
  public constructor(private svc: OrderService, private materialsvc: MaterialService, private router: Router) {
    this.orders = [];
    this.employeeids = [];
    this.locations = [];
  }
  ngOnInit() {
    this.svc.orderHistory(1).subscribe((res) => {
      console.log(res);
      this.orders = res;
      this.getEmployeeid(this.orders);
    })
  }
  getEmployeeid(orders: any) {
    console.log("ord")
    this.orders.forEach((item) => {
      this.employeeids.push(item.employeeId)
    });
    console.log(this.employeeids);
    this.getLocations(this.employeeids);
  }

  getLocations(employeeids: any) {
    this.employeeids.forEach(element => {
      this.materialsvc.getLocation(element).subscribe((res) => {
        console.log(res);
        this.locations = res;
      })
    });
  }

  onView(orderId: number) {
    this.router.navigate(['orderdetails', orderId]);

  }
}
