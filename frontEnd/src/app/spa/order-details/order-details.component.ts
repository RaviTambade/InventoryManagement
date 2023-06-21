import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  result: any;
  dateTime: string = '';
  date: any;
  requestId: number = 0;
  employee: string = '';
  orderDetails: any;
  orderDetail: any;
  changeStatus: any;
  public constructor(private svc: OrderService, private _cartsvc: CartService, private _materialsvc: MaterialService, private router: Router, private activeRoute: ActivatedRoute) {
    this.orderDetails = {
      "id": 0,
      "category": '',
      "department": '',
      "employeeFirstName": '',
      "employeeLastName": '',
      "imageUrl": '',
      "orderDate": '',
      "quantity": 0,
      "name": '',
      "status": ''
    }
    // this.orderDetail = {
    //   "id": 0,
    //   "category": '',
    //   "department": '',
    //   "employeeFirstName": '',
    //   "employeeLastName": '',
    //   "imageUrl": '',
    //   "orderDate": '',
    //   "quantity": 0,
    //   "name": '',
    //   "status": ''
    // }

    this.changeStatus = {
      "statusId": 3,
      "orderId": 0
    }
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe((param) => {
      this.result = param.get('requestId')
      this.requestId = Number.parseInt(this.result)
      console.log(this.requestId)
    })
    this.svc.getOrderDetails(this.requestId).subscribe((res) => {
      console.log(res);
      this.orderDetails = res;
      this.getData()
    })
  }

  getData(){
    this.orderDetail = this.orderDetails[0];
      this.dateTime = this.orderDetail.orderDate;
      this.date = this.dateTime.split('T');
      console.log(this.orderDetail)

  }
  onProceed(orderId: number) {
    console.log(orderId);
    this.changeStatus.orderId = orderId;
    console.log(this.changeStatus)
    this._cartsvc.ChangeStatus(this.changeStatus).subscribe((res) => {
      console.log(res)
    })
    this.router.navigate(["orderhistory"])

  }


}
