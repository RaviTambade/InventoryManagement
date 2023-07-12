import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';
import { OrderDetails } from 'src/app/OrderDetails';

@Component({
  selector: 'order-details',
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
  date: any;
  storemanagerid:number=1;
  changeStatus: any;
  public constructor(private svc: OrderService, private _cartsvc: CartService, private _materialsvc: MaterialService, private router: Router, private activeRoute: ActivatedRoute) {
    this.orderDetails=[];

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
    this.svc.getOrderDetails(this.requestid,this.storemanagerid).subscribe((res) => {
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
  onApproved() {


  }


}
