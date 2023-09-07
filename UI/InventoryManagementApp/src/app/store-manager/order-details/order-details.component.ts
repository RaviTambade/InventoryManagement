import { Component } from '@angular/core';
import { OrderDetails } from '../Models/OrderDetails';
import { OrderService } from 'src/app/Services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  
  orderDetails: OrderDetails[];
  result: any;
  requestid: number = 0;
  employee: string = '';
  orderDetail: any;
  dateTime: string = '';
  date: Date|undefined;
  storemanagerid: number = 2;
  changeStatus: any;
  quantity: number = 0;
  public constructor(private _location:Location,private svc: OrderService,  private activeRoute: ActivatedRoute) {
    this.orderDetails = [];

    this.changeStatus = {
      "statusId": 3,
      "orderId": 0
    }
  }
  ngOnInit() {
    this.activeRoute.paramMap.subscribe((param) => {
      this.result = param.get('requestid')
      this.requestid = Number.parseInt(this.result)
      console.log(this.requestid)
    })
    this.svc.getOrderDetails(this.requestid, this.storemanagerid).subscribe((res) => {
      console.log(res);
      this.orderDetails = res;
      this.orderDetail=this.orderDetails[0];
      console.log(this.orderDetail)
    })
  }

  onApproved(orderid: any, q: any) {
    this.quantity = Number.parseInt(q)
    this.svc.Approve(orderid, this.quantity).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })

  }
  onBack(){
    this._location.back();
  }


}
