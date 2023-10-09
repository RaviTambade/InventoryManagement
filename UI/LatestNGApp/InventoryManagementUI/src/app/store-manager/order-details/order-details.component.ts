import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { OrderDetails } from 'src/app/Models/orderDetails';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails: OrderDetails[] = [];
  orderId: number = 0;
  newDetails: boolean = false;
  department: string = '';
  orderDate = new Date();
  shipperName: string = '';
  inprogressOrder: boolean = false;
  shipper: User = {
    id: 0,
    name: ""
  };
  isApprove: boolean = false;
  isShipper: boolean = false;

  constructor(private orderService: OrderService, private _usersvc: UserService) { }

  ngOnInit(): void {
    this.orderService.selectedOrderId$.subscribe((id) => {
      console.log(id)
      this.orderId = id;
      if (id == 0 || id == undefined) {
        this.orderDetails = [];
        this.newDetails = false;
      }
      else
        this.getOrderDetails();

    })
  }

  getOrderDetails() {
    this.orderService.getOrderDetails(this.orderId).subscribe((res) => {
      console.log(res);
      this.orderDetails = res;
      this.newDetails = true;
      this.getUser();
      this.getCommonValues(); 
    })
  }

  getUser() {
    const userId = this.orderDetails[0].userId;
    console.log(userId);
    this._usersvc.getUser(userId).subscribe((res) => {
      console.log(res[0]);
      this.shipperName = res[0].name;
      this.isShipper = true;
    })
  }

  onApproved(orderid: any, q: any) {
    const quantity = Number.parseInt(q)
    this.orderService.Approve(orderid, quantity).subscribe((res) => {

      if (res == true) {
        const indexToChange = this.orderDetails.findIndex(item => item.id === orderid);
          this.orderDetails[indexToChange].itemStatus = true;
      }
      const status = this.orderDetails.filter(i => i.itemStatus == false);
      if (status.length == 0) {
        window.location.reload();
      }
    })

  }

  getCommonValues(){
    this.department = this.orderDetails[0].department;
    this.orderDate = this.orderDetails[0].orderDate;

    if (this.orderDetails[0].status == 'inprogress') {
      this.inprogressOrder = true;
    }
    else
      this.inprogressOrder = false;
  }
}
