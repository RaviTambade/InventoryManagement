import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/Order';
import { AppService } from 'src/app/app.service';
import { RequestService } from '../request.service';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  requests: any[];
  requestIds: any[];
  locations: any[];
  request: any[];
  empid: number = 1;
  public constructor(private _ordersvc: OrderService, private _requestsvc: RequestService, private appsvc: AppService, private router: Router) {
    this.requests = [];
    this.requestIds = [{
      "category": '',
      "date": '',
      "materialId": 0,
      "orderId": 0,
      "quantity": 0,
      "requestId": 0,
      "status": ''
    }];
    this.locations = [];
    this.request = [];
  }
  ngOnInit() {
    // this.svc.orderHistory(1).subscribe((res) => {
    //   console.log(res);
    //   this.orders = res;
    //   console.log(this.orders);
    // })

    this._requestsvc.getRequestId(this.empid).subscribe((res) => {
      this.requestIds = res;
      console.log(this.requestIds)
      this.requestIds.forEach(element => {
        console.log(element.requestId); 
        this.request.push(element.requestId);
        console.log(this.request)
      });
      this.getRequest()
    })

  }

  getRequest(){ 
    console.log(this.request)
    this._ordersvc.getRequestHistory(this.request).subscribe((res)=>{
      console.log(res);
      this.requests=res;
    })
  }


  onView(requestId: number) {
    this.router.navigate(['orderdetails', requestId]);

  }
}
