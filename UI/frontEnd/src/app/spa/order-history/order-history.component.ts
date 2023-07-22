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

  orders:Order[]|undefined;
  noOrder:boolean=false;
  completedOrder:Order[]|undefined
  storemanagerid: number = 1;
  public constructor(private _ordersvc: OrderService, private _requestsvc: RequestService, private appsvc: AppService, private router: Router) {
    
  }
  ngOnInit() {
    this._ordersvc.getOrders(this.storemanagerid).subscribe((res) => {
      console.log(res);
      this.orders=res;
      console.log(this.orders)
      if(res==0)
      {
        this.noOrder=true;
      }
      console.log(this.noOrder)
    })

    this._ordersvc.getCompletedOrders(this.storemanagerid).subscribe((res) => {
      console.log("inside")
      console.log(res);
      this.completedOrder=res;
    })

  }
 

  onView(requestid: number) {
    this.router.navigate(['orderdetails', requestid]);

  }
}
